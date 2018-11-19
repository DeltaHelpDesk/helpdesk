import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [AuthService],
    controllers: [],
})
export class AuthModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(UserMiddleware)
    //         .forRoutes({ path: '*', method: RequestMethod.ALL });
    // }
}