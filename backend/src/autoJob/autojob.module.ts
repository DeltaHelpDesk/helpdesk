import { Module } from '@nestjs/common';
import { AutoJobController } from './autojob.controller';
import { AutoJobService } from './autojob.services';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginToken } from '../auth/loginToken.entity';

@Module({
    controllers: [AutoJobController],
    providers: [
        AutoJobService,
    ],
    imports: [
        TypeOrmModule.forFeature([LoginToken]),
        ConfigModule,
    ],
})
export class AutoJobModule { }