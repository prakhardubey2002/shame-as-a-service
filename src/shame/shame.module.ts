import { Module } from '@nestjs/common';
import { ShameController } from './shame.controller';
import { ShameService } from './shame.service';

@Module({
  controllers: [ShameController],
  providers: [ShameService],
})
export class ShameModule {}
