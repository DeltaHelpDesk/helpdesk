import { Injectable, Inject } from '@nestjs/common';
import { JwtPayload } from './jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    getSession() {
    }

    async loginEmail(email: string, textPassword: string) {
        let user = await this.userRepository.findOne({ email });
        if (!(await bcrypt.compare(textPassword, user.password))) {
            // tslint:disable-next-line:no-string-throw
            throw 'Bad password';
        }
        const jwtPayload: JwtPayload = { userId: user.id, authType: user.authType };
        const token = this.jwtService.sign(jwtPayload);
        user.token = token;
        user = await this.userRepository.save(user);
        return {...user, token };
    }

    logout(user: User) {
        // todo: logout
    }

    async createUserEmail(email: string, textPassword: string, fullName: string) {
        const password = await bcrypt.hash(textPassword, 10);
        const user = await this.userRepository.create({ email, password, fullName, authType: AuthType.EMAIL });
        return user;
    }

    loginOffice(token: string) {
        const jwtPayload: JwtPayload = { userId: 0, authType: AuthType.OFFICE, token };
        return this.jwtService.sign(jwtPayload);
    }
}
