import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('layouts/index.hbs')
  root() {
    return { message: 'Hello world!', blah: 'ROAR' };
  }
}
