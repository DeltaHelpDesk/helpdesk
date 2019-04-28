import { User as UserEntity } from './user.entity';
import { createParamDecorator } from '@nestjs/common';
import * as util from 'util';

export const User = createParamDecorator(
    (data, [root, args, ctx, info]): UserEntity | undefined => {
        return ctx.req.user;
    },
);