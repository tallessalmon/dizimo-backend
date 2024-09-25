import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { Prisma } from '@prisma/client';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Post()
  create(@Body() createThemeDto: Prisma.ThemeCreateInput) {
    return this.themeService.create(createThemeDto);
  }

  @Get()
  findAll() {
    return this.themeService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.themeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateThemeDto: Prisma.ThemeUpdateInput) {
  //   return this.themeService.update(+id, updateThemeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.themeService.remove(+id);
  // }
}
