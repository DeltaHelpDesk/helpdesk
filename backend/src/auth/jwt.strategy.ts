import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwtPayload.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService, private readonly userRepository: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `bi',.;p[p[../42y5u6jugng259/**[;l;'.;'joigytyg215985+39+*-*9+393gtryerttyrweswry8tbd];`,
        });
    }

    async validate({ userId }: JwtPayload) {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}