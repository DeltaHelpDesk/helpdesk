import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { LocalizationModule } from './localization/localization.module';
import { TaskModule } from './task/task.module';
import { join } from 'path';
import { gqlContextFunction } from './gqlContext';
import { FakeDataService } from './fakeData.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/ConfigModule';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
    imports: [
        GraphQLModule.forRoot({
            context: gqlContextFunction,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/gql.ts'),
                outputAs: 'class',
            },
            /* debug: true,
             introspection: true,
             playground: true,*/
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                return {
                    ...config.getConfig(),
                    synchronize: true,
                    logging: true,
                    type: 'mysql',
                } as MysqlConnectionOptions;
            },
        }),
        AuthModule,
        LocalizationModule,
        TaskModule,
    ],
    controllers: [AppController],
    providers: [
        FakeDataService,
    ],
})
export class AppModule { }
