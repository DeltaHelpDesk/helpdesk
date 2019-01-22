import { User } from 'auth/user.entity';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { UserRole, UserRoleAscendency } from './userRole.enum';
import { GqlAuthGuard } from './gqlAuth.guard';

@Injectable()
export class GqlRoleGuard extends GqlAuthGuard {
    constructor(private role: UserRole) {
        super();
    }
    canActivate(context: ExecutionContext) {
        const { user } = this.getRequest(context);
        const requiredRoleIndex = UserRoleAscendency.findIndex(role => role === this.role);
        const userRoleIndex = UserRoleAscendency.findIndex(role => role === (user as User).role);
        return super.canActivate(context) && userRoleIndex >= requiredRoleIndex;
    }
}