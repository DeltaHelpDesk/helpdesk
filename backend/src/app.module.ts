import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
