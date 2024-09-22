import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  send(@Body() data: {image: string, message: string, group: string[]}) {
    return this.tasksService.sendCustomMessage(data);
  }

  @Get()
  getInformations() {
    return this.tasksService.getInformation();
  }

  @Get(':id')
  getInformationsId(@Param('id') id: number) {
    return this.tasksService.getInformationId(id);
  }
}
