import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TitheService } from './tithe.service';
import { Prisma, Tithe } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tithe')
export class TitheController {
  constructor(private readonly titheService: TitheService) {}

  @Post()
  create(@Body() data: Prisma.TitheCreateInput): Promise<Tithe> {
    return this.titheService.create(data);
  }

  @Get()
  findAll() {
    return this.titheService.findAll();
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
