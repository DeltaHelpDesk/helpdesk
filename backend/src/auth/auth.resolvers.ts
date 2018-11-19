import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.param.decorator';

@Resolver('Auth')
export class AuthResolvers {
    constructor(private readonly authService: AuthService) { }

    @Query('session')
    async getSession(@User() user) {
        return user;
    }

    @Mutation('loginOffice')
    async loginOffice(
        @Args('token')
        token: string,
    ) {
        return await this.authService.loginOffice(token);
    }

    @Mutation('loginEmail')
    async login(
        @Args('email')
        email: string,
        @Args('password')
        password: string,
    ) {
        return await this.authService.loginEmail(email, password);
    }

    @Mutation('logout')
    async logout() {
        return await this.authService.logout();
    }

    @Mutation('createUserEmail')
    async createEmailUser(
        @Args('email')
        email: string,
        @Args('password')
        password: string,
    ) {
        return await this.authService.createUserEmail(email, password);
    }
}