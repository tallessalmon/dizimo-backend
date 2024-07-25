import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { BanksService } from './banks.service';
import { Bank, Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post()
  create(@Body() data: Prisma.BankCreateInput): Promise<Bank> {
    return this.banksService.create(data);
  }

  @Get()
  findAll() {
    return this.banksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.BankUpdateInput) {
    return this.banksService.update(+id, data);
  }
}
