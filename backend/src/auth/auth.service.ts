import { Injectable, Inject, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
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

    async loginEmail(email: string, textPassword: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ email });
        if (!user || !user.password || !(await bcrypt.compare(textPassword, user.password))) {
            throw new HttpException('Bad email or password', HttpStatus.UNAUTHORIZED);
        }
        const jwtPayload: JwtPayload = { userId: user.id, authType: AuthType.EMAIL };
        const token = this.jwtService.sign(jwtPayload);
        await this.registerLoginToken(token, user);

        user.token = token;
        return user;
    }

    private async registerLoginToken(token: string, owner: User): Promise<boolean> {
        if (!token || !owner) {
            return false;
        }
        let newToken = this.tokenRepository.create({
            loginProvider: AuthType.EMAIL,
            ownerid: owner.id,
            providerKey: token,
        });
        newToken = await this.tokenRepository.save(newToken);
        return true;
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

    async createUserEmail(email: string, textPassword: string, fullName: string, role?: UserRole) {
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
            // tslint:disable-next-line:no-console
            // console.log(userData);

            const mail: string | undefined = userData.mail || userData.userPrincipalName;
            const microsoftId: string | undefined = userData.id;
            if (!mail) {
                throw new HttpException(`Could not authorize, Microsoft graph didn't return email`, HttpStatus.UNAUTHORIZED);
            }
            if (!this.checkEmailDomain(mail)) {
                throw new HttpException(`Email is not on authorized domain`, HttpStatus.UNAUTHORIZED);
            }

            let user = await this.userRepository.findOne({ email: mail });
            if (!user) {
                user = this.userRepository.create({
                    email: mail,
                    fullName: userData.displayName,
                    // otherToken,
                });
                user = await this.userRepository.save(user);
                let loginToken = this.tokenRepository.create({
                    ownerid: user.id,
                    loginProvider: AuthType.MICROSOFT,
                    providerKey: microsoftId,
                });
                loginToken = await this.tokenRepository.save(loginToken);
            }
            const tokens = await user.loginTokens;
            const microsoftToken = tokens.find((x) => x.loginProvider === AuthType.MICROSOFT);
            if (!microsoftToken || microsoftToken.providerKey !== microsoftId) {
                throw new HttpException('Invalid Microsoft id', HttpStatus.UNAUTHORIZED);
            }

            const jwtPayload: JwtPayload = {
                userId: user.id,
                authType: AuthType.MICROSOFT,
                externalToken: microsoftId,
            };
            const token = this.jwtService.sign(jwtPayload);
            await this.registerLoginToken(token, user);
            user.token = token;
            // user.otherToken = otherToken;
            // user = await this.userRepository.save(user);
            return user;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error('unknown exception on microsoft office login', e);
            throw new HttpException('Could not authorize Microsoft account', HttpStatus.UNAUTHORIZED);
        }
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
        if (!t || t.loginProvider !== AuthType.EMAIL) {
            return undefined;
        }
        /// Doplnění tokenu zpět uživateli
        user.token = token;
        return user;
    }

    checkEmailDomain(email: string): boolean {
        return email.split('@')[1] === 'delta-studenti.cz';
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
}
