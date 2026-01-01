import { Module } from '@nestjs/common';
import { ShameModule } from './shame/shame.module';

@Module({
  imports: [ShameModule],
})
export class AppModule {}
