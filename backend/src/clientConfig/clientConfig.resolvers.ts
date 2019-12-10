import { Resolver, Query } from '@nestjs/graphql';
import { ClientConfig } from './clientConfig.type';
import { Defaults } from '../common/defaults';

@Resolver('ClientConfig')
export class ClientConfigResolver {
    @Query('clientConfig')
    getConfig(): ClientConfig {
        return {
            // Validation config
            validation: Defaults.GetValidation(),
            // Default prefs
            preferencies: Defaults.GetPreferences(),
        };
    }
}
