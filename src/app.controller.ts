import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('app')
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

  @Get('/cakir')
  getCakir(): string {
    return 'Kim ne oluyorsa Allah mübarek etsin dayı. Azdan az çoktan çok gider. - İstanbul Sefiri';
  }

  @Get('/cengo')
  getNapolyon(): string {
    return 'Siktir git laaan öyle şey mi olur amına - Cengo';
  }

  @Get('/derdo')
  getSad(): string {
    return 'İntihardan önce ölünür sonra intihar edilir.';
  }
}
