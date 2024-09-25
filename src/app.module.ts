import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TithersModule } from './tithers/tithers.module';
import { TitheModule } from './tithe/tithe.module';
import { UsersModule } from './users/users.module';
import { CommunityModule } from './community/community.module';
import { BanksModule } from './banks/banks.module';
import { OffertoryModule } from './offertory/offertory.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [AuthModule, TithersModule, TitheModule, UsersModule, CommunityModule, BanksModule, OffertoryModule, TasksModule, ScheduleModule.forRoot(), WhatsappModule, ThemeModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

