import { AuthType } from './authType.enum';

export interface JwtPayload {
    userId: number;
    authType: AuthType;
    externalToken?: string;
    issued?: Date;
}