import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  root(): { status: string } {
    return { status: 'ok' };
  }

}
