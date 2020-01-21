import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.param.decorator';
import { User as UserEntity } from './user.entity';
import { UserRole } from './userRole.enum';
import { GqlRoleGuard } from './gqlRole.guard';
import { GqlAuthGuard } from './gqlAuth.guard';
import { AuthType } from './authType.enum';

@Resolver('Auth')
export class AuthResolvers {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(GqlAuthGuard)
    @Query('session')
    getSession(@User() user: UserEntity): UserEntity {
        return user;
    }

    @UseGuards(GqlAuthGuard)
    @Query('admins')
    async getAdmins(): Promise<UserEntity[]> {
        return await this.authService.getAdmins();
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.ADMIN))
    @Query('users')
    async getUsers(): Promise<UserEntity[]> {
        return await this.authService.getUsers();
    }

    @Mutation('loginExternal')
    async loginExternal(
        @Args('email')
        email: string,
        @Args('name')
        name: string,
        @Args('provider')
        provider: AuthType,
        @Args('token')
        token: string,
    ): Promise<UserEntity | undefined> {
        return await this.authService.loginExternal(provider, email, token, name);
    }

    @Mutation('loginOffice')
    async loginOffice(
        @Args('token')
        token: string,
    ): Promise<UserEntity | undefined> {
        return await this.authService.loginOffice(token);
    }

    @Mutation('loginEmail')
    async login(
        @Args('email')
        email: string,
        @Args('password')
        password: string,
    ): Promise<UserEntity | undefined> {
        return await this.authService.loginEmail(email, password);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation('logout')
    async logout(@User() user: UserEntity): Promise<boolean> {
        return await this.authService.logout(user);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.SUPERADMIN))
    @Mutation('createUserEmail')
    async createUserEmail(
        @Args('email')
        email: string,
        @Args('password')
        password: string,
        @Args('fullName')
        fullName: string,
    ): Promise<UserEntity | undefined> {
        return await this.authService.createUserEmail(email, password, fullName);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.ADMIN))
    @Mutation('adminEditUser')
    async adminEditUser(
        @Args('userId')
        userId: number,
        @Args('email')
        email: string,
        @Args('fullName')
        fullName: string,
        @Args('className')
        className: string,
        @Args('role')
        role: UserRole,
    ): Promise<UserEntity | undefined> {
        return await this.authService.adminEditUser(userId, email, fullName, className, role);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.DEFAULT))
    @Mutation('editUser')
    async editUser(
        @Args('email')
        email: string,
        @Args('fullName')
        fullName: string,
        @Args('className')
        className: string,
        @Args('language')
        language: string,
        @Args('theme')
        theme: string,
        @User()
        currentUser: UserEntity,
    ): Promise<UserEntity | undefined> {
        return await this.authService.editUser(currentUser, email, fullName, className, language, theme, currentUser.role);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.SUPERADMIN))
    @Mutation('removeUser')
    async removeUser(
        @Args('email')
        email: string,
        @User()
        currentUser: UserEntity,
    ): Promise<boolean> {
        return await this.authService.deactivateUser(email, currentUser);
        // return await this.authService.removeUser(email, currentUser);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.DEFAULT))
    @Mutation('changePassword')
    async changePassword(
        @Args('oldPassword')
        oldPassword: string,
        @Args('newPassword')
        newPassword: string,
        @User()
        currentUser: UserEntity,
    ): Promise<boolean> {
        return await this.authService.changePassword(oldPassword, newPassword, currentUser);
    }
}
