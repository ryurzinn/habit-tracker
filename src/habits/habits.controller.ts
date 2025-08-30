import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('habits')
export class HabitsController {
  constructor(
    private readonly habitsService: HabitsService
  ) {}

  @Post()
  create(
    @Body() createHabitDto: CreateHabitDto, 
    @GetUser() user: User,
  ) {
    return this.habitsService.create(createHabitDto, user);
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
