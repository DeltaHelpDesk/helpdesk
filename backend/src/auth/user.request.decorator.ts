import { User as UserEntity } from './user.entity';
import { createRouteParamDecorator } from '@nestjs/common';

export const User = createRouteParamDecorator((data, req): UserEntity | undefined => {
    return req.user;
});