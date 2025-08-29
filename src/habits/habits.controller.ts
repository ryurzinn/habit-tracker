import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(
    private readonly habitsService: HabitsService
  ) {}

  @Post()
  create(@Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.create(createHabitDto);
  }

  @Get()
  findAll() {
    return this.habitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.habitsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(id, updateHabitDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.habitsService.remove(id);
  }
}
