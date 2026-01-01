import { Module } from '@nestjs/common';
import { ShameController } from './shame.controller';

@Module({
  controllers: [ShameController],
})
export class ShameModule {}
