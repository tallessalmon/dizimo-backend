import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { OffertoryService } from './offertory.service';
import { Prisma, Offertory } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import  moment from 'moment-timezone';



@UseGuards(AuthGuard)
@Controller('offertory')
export class OffertoryController {
  constructor(private readonly offertoryService: OffertoryService) { }

  @Post()
  create(@Body() data: Prisma.OffertoryCreateInput): Promise<Offertory> {
    return this.offertoryService.create(data);
  }

  @Get()
  findAll(@Query('initialDate') initialDate: string, @Query('finalDate') finalDate: string) {
    const date = initialDate && finalDate 
    ? { "initialDate": moment(initialDate).toISOString(), "finalDate": moment(finalDate).endOf('day').toISOString() } : initialDate 
    ? { "initialDate": moment(initialDate).toISOString(), "finalDate": moment(initialDate).endOf('day').toISOString() } 
    : {}
    return this.offertoryService.findAll(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offertoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.OffertoryUpdateInput) {
    return this.offertoryService.update(+id, data);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.offertoryService.remove(+id);
  // }
}
