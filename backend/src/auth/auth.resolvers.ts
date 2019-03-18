import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.param.decorator';
import { User as UserEntity } from './user.entity';
import { UserRole } from './userRole.enum';
import { GqlRoleGuard } from './gqlRole.guard';
import { GqlAuthGuard } from './gqlAuth.guard';

@Resolver('Auth')
export class AuthResolvers {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(GqlAuthGuard)
    @Query('session')
    async getSession(@User() user: UserEntity) {
        return user;
    }

    @UseGuards(GqlAuthGuard)
    @Query('admins')
    async getAdmins(): Promise<UserEntity[]> {
        return await this.authService.getAdmins();
    }

    @UseGuards(new GqlRoleGuard(UserRole.SUPERADMIN))
    @Query('users')
    async getUsers(): Promise<UserEntity[]> {
        return await this.authService.getUsers();
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

    @UseGuards(new GqlRoleGuard(UserRole.SUPERADMIN))
    @Mutation('createUserEmail')
    async createUserEmail(
        @Args('email')
        email: string,
        @Args('password')
        password: string,
        @Args('fullName')
        fullName: string,
    ) {
        return await this.authService.createUserEmail(email, password, fullName);
    }

    @UseGuards(new GqlRoleGuard(UserRole.SUPERADMIN))
    @Mutation('removeUser')
    async removeUser(
        @Args('email')
        email: string,
    ) {
        return await this.authService.removeUser(email);
    }
}