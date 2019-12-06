import { Resolver, Query } from '@nestjs/graphql';
import { ClientConfig } from './clientConfig.type';

@Resolver('ClientConfig')
export class ClientConfigResolver {
    @Query('clientConfig')
    getConfig(): ClientConfig {
        return {
            validation: {
                taskSubjectMaxLength: 20,
                taskIssueMaxLength: 100,
            },
            // Default prefs
            preferencies: {
                language: 'cs_CZ',
                theme: 'light',
            },
        };
    }
}
