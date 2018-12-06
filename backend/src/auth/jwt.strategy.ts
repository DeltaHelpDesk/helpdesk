import { jwtSecretOrPrivateKey } from './jwt.config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwtPayload.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecretOrPrivateKey,
            passReqToCallback: true,
        });
    }

    async validate(req: any, jwtPayload: JwtPayload) {
        const token = req.headers.authorization.split(' ')[1];
        const user = await this.authService.validateJwtPayload(token, jwtPayload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}