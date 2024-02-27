import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { Community, Prisma } from '@prisma/client';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  create(@Body() data: Prisma.CommunityCreateInput): Promise<Community> {
    return this.communityService.create(data);
  }

  @Get()
  findAll() {
    return this.communityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.CommunityUpdateInput) {
    return this.communityService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communityService.remove(+id);
  }
}
