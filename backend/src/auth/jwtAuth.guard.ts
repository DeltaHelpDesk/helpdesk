import { User as UserEntity } from './user.entity';
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest<TUser = UserEntity>(err: any, user: any, info: any): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user as TUser;
    }
}