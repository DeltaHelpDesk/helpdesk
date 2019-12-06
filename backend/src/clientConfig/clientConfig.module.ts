import { Module } from '@nestjs/common';
import { ClientConfigResolver } from './clientConfig.resolvers';

@Module({
    providers: [ClientConfigResolver],
})
export class ClientConfigModule {}
