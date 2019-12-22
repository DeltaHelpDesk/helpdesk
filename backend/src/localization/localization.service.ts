import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class LocalizationService {
    getLocalization(lang: string, ns: string) {
        const path = require('path');

        if (!lang) {
            lang = 'cs';
        }
        if (!ns) {
            ns = 'translations';
        }
        if (!(/^[A-Za-z\-]+$/m.test(lang))) {
            throw new HttpException('Bad lang string', HttpStatus.BAD_REQUEST);
        }
        if (!(/^[A-Za-z\-]+$/m.test(ns))) {
            throw new HttpException('Bad namespace string', HttpStatus.BAD_REQUEST);
        }
        let localization: any;
        try {
            localization = require(path.resolve('./src/localization/localizations', lang, `${ns}.json`));
        } catch (error) {
            localization = require('./localizations/cs/translations.json');
        }
        return localization;
    }
}
