import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class LocalizationService {
    getLocalization(lang: string) {
        if (!(/^[A-Za-z\-]+$/m.test(lang))) {
            throw new HttpException('Bad lang string', HttpStatus.BAD_REQUEST);
        }
        let localization: any;
        try {
            localization = require('./localizations/');
        } catch (error) {
            localization = require('./localizations/en.json');
        }
        return localization;
    }
}
