import { Module } from '@nestjs/common';
import { TithersService } from './tithers.service';
import { TithersController } from './tithers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TithersController],
  providers: [TithersService, PrismaService],
})
export class TithersModule {}
