import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginToken } from '../auth/loginToken.entity';

@Injectable()
export class AutoJobService {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(LoginToken)
        private readonly tokenRepository: Repository<LoginToken>,
    ) { }

    checkLogin(username: string, password: string): boolean {
        if (!username || !password) {
            return false;
        }
        const autoName = this.configService.get('AUTOJOB_NAME');
        const autoPwd = this.configService.get('AUTOJOB_PWD');
        if (username !== autoName || password !== autoPwd) {
            return false;
        }
        return true;
    }

    async clearExpiredTokens() {
        try {
            const res = await this.tokenRepository
                .createQueryBuilder()
                .where('login_token.expiration IS NOT NULL')
                .andWhere('expiration < :exp ', { exp: new Date() })
                .delete()
                .execute();
        } catch {
            return false;
        }
        return true;
    }

}