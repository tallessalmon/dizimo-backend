import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TithersModule } from './tithers/tithers.module';
import { TitheModule } from './tithe/tithe.module';
import { UsersModule } from './users/users.module';
import { CommunityModule } from './community/community.module';
import { BanksModule } from './banks/banks.module';

@Module({
  imports: [AuthModule, TithersModule, TitheModule, UsersModule, CommunityModule, BanksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
