import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { LocalizationModule } from './localization/localization.module';
import { TaskModule } from 'task/task.module';
import { join } from 'path';
import { gqlContextFunction } from './gqlContext';
import { FakeDataService } from 'fakeData.service';

@Module({
    imports: [
        GraphQLModule.forRoot({
            context: gqlContextFunction,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/gql.ts'),
                outputAs: 'class',
            },
        }),
        TypeOrmModule.forRoot(),
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
