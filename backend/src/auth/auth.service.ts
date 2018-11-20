import { Injectable, Inject } from '@nestjs/common';
import { JwtPayload } from './jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';

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
        const password = textPassword;
        const user = await this.userRepository.findOne({ email, password });
        const jwtPayload: JwtPayload = { userId: user.id, authType: user.authType };
        const token = this.jwtService.sign(jwtPayload);
        return {...user, token };
    }

    logout() {
    }

    async createUserEmail(email: string, textPassword: string, fullName: string) {
        const password = textPassword;
        return await this.userRepository.create({ email, password, fullName, authType: AuthType.EMAIL });
    }

    loginOffice(token: string) {
        const jwtPayload: JwtPayload = { userId: 0, authType: AuthType.OFFICE, token };
        return this.jwtService.sign(jwtPayload);
    }
}
