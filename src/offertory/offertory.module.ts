import { Module } from '@nestjs/common';
import { OffertoryService } from './offertory.service';
import { OffertoryController } from './offertory.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OffertoryController],
  providers: [OffertoryService, PrismaService],
})
export class OffertoryModule {}
