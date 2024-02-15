import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TithersModule } from './tithers/tithers.module';
import { TitheModule } from './tithe/tithe.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, TithersModule, TitheModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
