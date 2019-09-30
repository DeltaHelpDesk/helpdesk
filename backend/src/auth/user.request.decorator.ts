import { User as UserEntity } from './user.entity';
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req): UserEntity | undefined => {
    return req.user;
});