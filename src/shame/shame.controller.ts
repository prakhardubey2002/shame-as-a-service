import { Controller, Get } from '@nestjs/common';

@Controller()
export class ShameController {
  @Get()
  getShame(): string {
    return 'shame';
  }
}
