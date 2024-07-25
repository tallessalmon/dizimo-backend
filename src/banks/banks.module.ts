import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BanksController],
  providers: [BanksService, PrismaService],
})
export class BanksModule {}
