import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.param.decorator';
import { User as UserEntity } from './user.entity';

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
    async logout(@User() user: UserEntity) {
        return await this.authService.logout(user);
    }

    @Mutation('createUserEmail')
    async createEmailUser(
        @Args('email')
        email: string,
        @Args('password')
        password: string,
        @Args('fullName')
        fullName: string,
    ) {
        return await this.authService.createUserEmail(email, password, fullName);
    }
}