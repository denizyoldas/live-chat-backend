import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  getHello(): string {
    return 'Salam Dünya! - massaka';
  }

  @Get('massaka')
  getMassaka(): string {
    return 'Salam Dünya! - DYA';
  }
}
