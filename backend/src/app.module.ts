import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { LocalizationModule } from './localization/localization.module';
import { TaskService } from './task/task/task.service';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    LocalizationModule,
  ],
  controllers: [AppController],
  providers: [TaskService],
})
export class AppModule { }
