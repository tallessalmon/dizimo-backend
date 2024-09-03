import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  imports: [ScheduleModule.forRoot(), WhatsappModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
