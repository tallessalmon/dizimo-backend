import { Module } from '@nestjs/common';
import { TitheService } from './tithe.service';
import { TitheController } from './tithe.controller';

@Module({
  controllers: [TitheController],
  providers: [TitheService],
})
export class TitheModule {}
