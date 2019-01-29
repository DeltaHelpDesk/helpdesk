import { User as UserEntity } from './user.entity';
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
    (data, [root, args, ctx, info]): UserEntity | undefined => {
        return ctx.user;
    },
);