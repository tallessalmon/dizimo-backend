import { Module } from '@nestjs/common';
import { TitheService } from './tithe.service';
import { TitheController } from './tithe.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TitheController],
  providers: [TitheService, PrismaService],
})
export class TitheModule {}
