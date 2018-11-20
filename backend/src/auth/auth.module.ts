import { AuthResolvers } from './auth.resolvers';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: `bi',.;p[p[../42y5u6jugng259/**[;l;'.;'joigytyg215985+39+*-*9+393gtryerttyrweswry8tbd];`,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    providers: [
        JwtStrategy,
        AuthService,
        AuthResolvers,
    ],
    controllers: [],
})
export class AuthModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(UserMiddleware)
    //         .forRoutes({ path: '*', method: RequestMethod.ALL });
    // }
}