import { LocalizationService } from './localization.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('localization/')
export class LocalizationController {
    constructor(private readonly localizationService: LocalizationService) {}

    @Get(':lang')
    root(@Param('lang') lang: string): {[s: string]: string} {
        return this.localizationService.getLocalization(lang);
    }
}
