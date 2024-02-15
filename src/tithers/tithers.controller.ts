import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TithersService } from './tithers.service';
import { Prisma, Tithers } from '@prisma/client';

@Controller('tithers')
export class TithersController {
  constructor(private readonly tithersService: TithersService) {}

  @Post()
  create(@Body() data: Prisma.TithersCreateInput): Promise<Tithers> {
    return this.tithersService.create(data);
  }

  @Get()
  findAll() {
    return this.tithersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tithersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TithersUpdateInput) {
    return this.tithersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tithersService.remove(+id);
  }
}
