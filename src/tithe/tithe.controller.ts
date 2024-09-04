import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TitheService } from './tithe.service';
import { Prisma, Tithe } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import  moment from 'moment-timezone';

@UseGuards(AuthGuard)
@Controller('tithe')
export class TitheController {
  constructor(private readonly titheService: TitheService) {}

  @Post()
  create(@Body() data: Prisma.TitheCreateInput): Promise<Tithe> {
    return this.titheService.create(data);
  }

  @Get()
  findAll(@Query('initialDate') initialDate: string, @Query('finalDate') finalDate: string) {
    const date = initialDate && finalDate 
    ? { "initialDate": moment(initialDate).startOf('month').toISOString(), "finalDate": moment(finalDate).endOf('month').toISOString() } : initialDate 
    ? { "initialDate": moment(initialDate).startOf('day').toISOString(), "finalDate": moment(initialDate).endOf('day').toISOString() } 
    : {}
    return this.titheService.findAll(date)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titheService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TitheUpdateInput) {
    return this.titheService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titheService.remove(+id);
  }
}
