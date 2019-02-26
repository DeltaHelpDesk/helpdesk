import { User } from 'auth/user.entity';

export enum UserRole {
    DEFAULT = 'DEFAULT',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
}

export const UserRoleAscendency = [
    UserRole.DEFAULT,
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
];

export function checkUserRole(userRole: UserRole, requiredUserRole: UserRole) {
    const requiredRoleIndex = UserRoleAscendency.findIndex(role => role === requiredUserRole);
    const userRoleIndex = UserRoleAscendency.findIndex(role => role === userRole);
    return userRoleIndex >= requiredRoleIndex;
}