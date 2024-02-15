import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TitheService } from './tithe.service';
import { CreateTitheDto } from './dto/create-tithe.dto';
import { UpdateTitheDto } from './dto/update-tithe.dto';

@Controller('tithe')
export class TitheController {
  constructor(private readonly titheService: TitheService) {}

  @Post()
  create(@Body() createTitheDto: CreateTitheDto) {
    return this.titheService.create(createTitheDto);
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
  update(@Param('id') id: string, @Body() updateTitheDto: UpdateTitheDto) {
    return this.titheService.update(+id, updateTitheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titheService.remove(+id);
  }
}
