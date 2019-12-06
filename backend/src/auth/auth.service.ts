import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { JwtPayload } from './jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';
import { UserRole } from './userRole.enum';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import * as bcrypt from 'bcrypt';
import { LoginToken } from './loginToken.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(LoginToken)
        private readonly tokenRepository: Repository<LoginToken>,
        private readonly jwtService: JwtService,
    ) { }

    /// Počet hodin, než expiruje obyčejný token (NE externí)
    readonly loginExpirationTime: number = 24;

    async loginEmail(email: string, textPassword: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ email });
        if (!user || !user.password || !(await bcrypt.compare(textPassword, user.password))) {
            throw new HttpException('Bad email or password', HttpStatus.UNAUTHORIZED);
        }
        const issued = new Date();
        const jwtPayload: JwtPayload = { userId: user.id, authType: AuthType.EMAIL, issued };
        const token = this.jwtService.sign(jwtPayload);
        await this.registerLoginToken(token, user, issued);

        user.token = token;
        return user;
    }

    private async registerLoginToken(token: string, owner: User, issued: Date): Promise<boolean> {
        if (!token || !owner) {
            return false;
        }
        let newToken = this.tokenRepository.create({
            loginProvider: AuthType.EMAIL,
            owner,
            providerKey: token,
            expiration: this.addHours(issued, this.loginExpirationTime),
        });
        newToken = await this.tokenRepository.save(newToken);
        return true;
    }

    /// Protože JS nic takového sám neumí :)
    addHours(d: Date, hours: number): Date {
        d.setUTCHours(d.getUTCHours() + hours);
        return d;
    }

    async logout(user: User): Promise<boolean> {
        if (!user || !user.token) {
            return false;
        }
        let token = await this.tokenRepository.findOne({ loginProvider: AuthType.EMAIL, providerKey: user.token });
        if (token) {
            token = await this.tokenRepository.remove(token);
        }
        user.token = undefined;
        return true;
    }

    async createUserEmail(email: string, textPassword: string, fullName: string, role?: UserRole): Promise<User | undefined> {
        if (!email || !textPassword || !fullName) {
            return undefined;
        }
        if (!role) {
            role = UserRole.DEFAULT;
        }
        const password = await bcrypt.hash(textPassword, 10);
        const user = this.userRepository.create({ email, password, fullName, role: role ? role : UserRole.DEFAULT });
        return await this.userRepository.save(user);
    }

    async loginOffice(otherToken: string): Promise<User | undefined> {
        try {
            const graphClient = MicrosoftGraph.Client.init({
                authProvider: (done) => {
                    done(null, otherToken);
                },
            });
            const userData = await graphClient
                .api('/me')
                .get();

            const microsoftId: string | undefined = userData.id;
            if (!microsoftId) {
                throw new HttpException(`Could not authorize, Microsoft graph didn't return id`, HttpStatus.UNAUTHORIZED);
            }
            const mail: string | undefined = userData.mail || userData.userPrincipalName;
            if (!mail) {
                throw new HttpException(`Could not authorize, Microsoft graph didn't return email`, HttpStatus.UNAUTHORIZED);
            }
            const fullName: string = userData.displayName;

            return await this.loginExternal(AuthType.MICROSOFT, mail, microsoftId, fullName);
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error('unknown exception on microsoft office login', e);
            throw new HttpException('Could not authorize Microsoft account', HttpStatus.UNAUTHORIZED);
        }
    }

    async loginExternal(type: AuthType, mail: string, externalId: string, externalFullName: string): Promise<User | undefined> {
        let user = await this.userRepository.findOne({ email: mail });
        let externalToken: LoginToken | undefined;
        if (!user) {
            /// Pokud uživatel neexistuje - vytvoř nového
            user = this.userRepository.create({
                email: mail,
                fullName: externalFullName,
            });
            user = await this.userRepository.save(user);
            /// Vytvoření a přiřazení externího tokenu k uživateli
            let loginToken = this.tokenRepository.create({
                owner: user,
                loginProvider: type,
                providerKey: externalId,
            });
            loginToken = await this.tokenRepository.save(loginToken);
            /// Nový token se ihned nepropíše k uživateli a select z dtb je zbytečně zatěžující
            externalToken = loginToken;
        }
        /// Načtení tokenů uživatele
        const tokens = await user.loginTokens;
        if (!externalToken) {
            externalToken = tokens.find((x) => x.loginProvider === type);
        }
        if (!externalToken || externalToken.providerKey !== externalId) {
            /// Externí token nesouhlasí
            throw new HttpException(`Invalid ${type} id`, HttpStatus.UNAUTHORIZED);
        }

        const issued = new Date();
        const jwtPayload: JwtPayload = {
            userId: user.id,
            authType: type,
            externalToken: externalId,
            issued,
        };
        const token = this.jwtService.sign(jwtPayload);
        await this.registerLoginToken(token, user, issued);
        user.token = token;
        return user;
    }

    async validateJwtPayload(token: string, { userId, authType, externalToken }: JwtPayload): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) {
            return user;
        }
        const tokens = await user.loginTokens;
        /// Ověření - pokud je uživatel přihlášen přes externí účet (Fb, Google,...) zda je token validní
        if (authType !== AuthType.EMAIL && externalToken) {
            const exToken = tokens.find(x => x.loginProvider === authType && x.providerKey === externalToken);
            if (!exToken) {
                return undefined;
            }
        }
        /// Ověření normálního tokenu (NE externího)
        const t = tokens.find(x => x.providerKey === token);
        if (!t || t.loginProvider !== AuthType.EMAIL || t.expired) {
            return undefined;
        }
        /// Doplnění tokenu zpět uživateli
        user.token = token;
        return user;
    }

    async removeUser(email: string, currentUser: User): Promise<boolean> {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new HttpException(`User with email: ${email} not found`, HttpStatus.NOT_FOUND);
        }

        if (user.id === currentUser.id) {
            throw new BadRequestException('Cannot delete currently logged in user');
        }

        if (user.role === UserRole.SUPERADMIN) {
            throw new BadRequestException('Cannot remove superadmin');
        }

        await this.userRepository.remove(user);
        return true;
    }

    async getAdmins(): Promise<User[]> {
        return await this.userRepository.find({
            where: [
                { role: UserRole.ADMIN },
                { role: UserRole.SUPERADMIN },
            ],
        });
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async adminEditUser(
        userId: number,
        newEmail?: string,
        newFullName?: string,
        newClassName?: string,
        newRole?: UserRole,
    ): Promise<User | undefined> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            return undefined;
        }
        return await this.editUser(user, newEmail, newFullName, newClassName, undefined, undefined, newRole);
    }

    async editUser(
        user: User,
        newEmail?: string,
        newFullName?: string,
        newClassName?: string,
        newLang?: string,
        newTheme?: string,
        newRole?: UserRole,
    ): Promise<User | undefined> {
        if (!user) {
            return undefined;
        }

        if (newEmail) {
            user.email = newEmail;
        }
        if (newFullName) {
            user.fullName = newFullName;
        }
        if (newClassName) {
            user.className = newClassName;
        }
        if (newLang) {
            user.language = newLang;
        }
        if (newTheme) {
            user.theme = newTheme;
        }
        if (newRole) {
            user.role = newRole;
        }
        return await this.userRepository.save(user);
    }

}
