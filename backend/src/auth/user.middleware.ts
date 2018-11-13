import { Middleware, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Middleware()
export class UserMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}
    resolve(...args: any[]): MiddlewareFunction {
        return async (req, res, next) => {
            const { session } = req;
            if (session && session.userId) {
                const user = await this.userRepository.findOneById(session.userId);
                if (user) {
                    req.user = user;
                }
            }
            next();
        };
    }
}