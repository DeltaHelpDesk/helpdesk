import { LocalizationService } from './localization.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('localization')
export class LocalizationController {
    constructor(private readonly localizationService: LocalizationService) {}

    @Get(':lang/:ns')
    root(@Param('lang') lang: string, @Param('ns') ns: string): {[s: string]: string} {
        return this.localizationService.getLocalization(lang, ns);
    }
}
