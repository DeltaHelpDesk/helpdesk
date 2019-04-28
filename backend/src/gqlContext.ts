import { User as UserEntity } from 'auth/user.entity';
import { ContextFunction } from 'apollo-server-core';

export interface GqlContext {
    req: any;
}

export const gqlContextFunction: ContextFunction<GqlContext> = async ({req}) => {
    return { req };
};