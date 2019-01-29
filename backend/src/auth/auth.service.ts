import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';
import { UserRole } from './userRole.enum';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}
    async loginEmail(email: string, textPassword: string): Promise<User | undefined> {
        let user = await this.userRepository.findOne({ email });
        if (!user || !user.password || !(await bcrypt.compare(textPassword, user.password))) {
            throw new HttpException('Bad email or password', HttpStatus.UNAUTHORIZED);
        }
        const jwtPayload: JwtPayload = { userId: user.id, authType: user.authType };
        if (user.authType !== AuthType.EMAIL) {
            jwtPayload.otherToken = user.otherToken;
        }
        const token = this.jwtService.sign(jwtPayload);
        user.token = token;
        user = await this.userRepository.save(user);
        return user;
    }

    async logout(user: User): Promise<boolean> {
        if (!user) {
          return false;
        }
        user.token = undefined;
        await this.userRepository.save(user);
        return true;
    }

    async createUserEmail(email: string, textPassword: string, fullName: string, role?: UserRole) {
        if (!role) {
          role = UserRole.DEFAULT;
        }
        const password = await bcrypt.hash(textPassword, 10);
        const user = this.userRepository.create({ email, password, fullName, authType: AuthType.EMAIL });
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
            if (!userData.mail) {
                throw new HttpException(`Could not authorize, Microsoft graph didn't return email`, HttpStatus.UNAUTHORIZED);
            }
            if (!this.checkEmailDomain(userData.mail)) {
                throw new HttpException(`Email is not on authorized domain`, HttpStatus.UNAUTHORIZED);
            }
            let user = await this.userRepository.findOne({ email: userData.mail });
            if (!user) {
                user = this.userRepository.create({
                    authType: AuthType.OFFICE,
                    email: userData.mail,
                    fullName: userData.displayName,
                    // otherToken,
                });
                user = await this.userRepository.save(user);
            }
            const jwtPayload: JwtPayload = {
                userId: user.id,
                authType: AuthType.OFFICE,
                // otherToken
            };
            const token = this.jwtService.sign(jwtPayload);
            user.token = token;
            // user.otherToken = otherToken;
            user = await this.userRepository.save(user);
            return user;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error('unknown exception on microsoft office login', e);
            throw new HttpException('Could not authorize Microsoft account', HttpStatus.UNAUTHORIZED);
        }
    }

    async validateJwtPayload(token: string, { userId, authType }: JwtPayload): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ id: userId, token, authType });
        return user;
    }

    checkEmailDomain(email: string): boolean {
        return email.split('@')[1] === 'delta-studenti.cz';
    }
}
