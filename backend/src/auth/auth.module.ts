import { UserMiddleware } from './user.middleware';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService],
    controllers: [],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}