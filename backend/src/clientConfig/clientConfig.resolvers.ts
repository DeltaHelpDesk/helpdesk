import { Resolver, Query } from '@nestjs/graphql';
import { ClientConfig } from './clientConfig.type';

@Resolver('ClientConfig')
export class ClientConfigResolver {
    @Query('clientConfig')
    getConfig(): ClientConfig {
        const config: ClientConfig = {
            validation: {
                taskSubjectMaxLength: 20,
                taskIssueMaxLength: 100,
            },
            preferencies: {
                language: 'cs_CZ',
                theme: 'light',
            },
        };
        return config;
    }
}
