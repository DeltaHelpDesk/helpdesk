import { User } from './user.entity';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { UserRole, UserRoleAscendency, checkUserRole } from './userRole.enum';
import { GqlAuthGuard } from './gqlAuth.guard';

@Injectable()
export class GqlRoleGuard extends GqlAuthGuard {
    constructor(private role: UserRole) {
        super();
    }
    canActivate(context: ExecutionContext) {
        const { user } = this.getRequest(context);
        return checkUserRole((user as User).role, this.role);
    }
}
