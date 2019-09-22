import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    getConfig(): any {
        return {
            host: this.get('TYPEORM_HOST'),
            database: this.get('TYPEORM_DATABASE'),
            username: this.get('TYPEORM_USERNAME'),
            password: this.get('TYPEORM_PASSWORD'),
            port: this.get('TYPEORM_PORT'),
            entities: [this.get('TYPEORM_ENTITIES')],
        };
    }
}