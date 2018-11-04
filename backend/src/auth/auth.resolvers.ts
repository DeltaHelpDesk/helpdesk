import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Auth } from '../graphql.schema';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Resolver('Auth')
export class AuthResolvers {
    constructor(private readonly authService: AuthService) { }

    @Query()
    async getAuth() {
        return await this.authService.findAll();
    }

    @Query('auth')
    async findOneById(
        @Args('id', ParseIntPipe)
        id: number,
    ): Promise<Auth> {
        return await this.authService.findOneById(id);
    }
}