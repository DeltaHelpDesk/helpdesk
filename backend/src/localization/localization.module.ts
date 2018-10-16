import { Module } from '@nestjs/common';
import { LocalizationController } from './localization.controller';
import { LocalizationService } from './localization.service';

@Module({
  controllers: [LocalizationController],
  providers: [LocalizationService]
})
export class LocalizationModule {}
