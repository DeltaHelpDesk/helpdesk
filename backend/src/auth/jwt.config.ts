import { SignOptions } from 'jsonwebtoken';

export const jwtSecretOrPrivateKey = `bi',.;p[p[../42y5u6jugng259/**[;l;'.;'joigytyg215985+39+*-*9+393gtryerttyrweswry8tbd];`; // todo: from ENV
export const jwtSignOptions: SignOptions = {
    expiresIn: 60 * 60 * 24 * 365, // one year expiration. until unauthorized error is handled in clients
};