import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolvers {
    constructor(private readonly authService: AuthService) { }

    @Query('session')
    async getSession() {
        return await this.authService.getSession();
    }

    @Mutation('login')
    async login(
        @Args('email')
        email: string,
        @Args('password')
        password: string,
    ) {
        return await this.authService.login(email, password);
    }

    @Mutation('logout')
    async logout() {
        return await this.authService.logout();
    }

    @Mutation('createUser')
    async createEmailUser(
        @Args('email')
        email: string,
        @Args('password')
        password: string,
    ) {
        return await this.authService.createEmailUser(email, password);
    }
}