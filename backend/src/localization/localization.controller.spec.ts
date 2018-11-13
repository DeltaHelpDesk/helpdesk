import { Test, TestingModule } from '@nestjs/testing';
import { LocalizationController } from './localization.controller';

describe('Localization Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LocalizationController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LocalizationController = module.get<LocalizationController>(LocalizationController);
    expect(controller).toBeDefined();
  });
});
