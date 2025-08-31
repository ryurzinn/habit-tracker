import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('habits')
export class HabitsController {
  constructor(
    private readonly habitsService: HabitsService
  ) {}

  @Post()
  @Auth()
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
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHabitDto: UpdateHabitDto,
    @GetUser() user: User
  ) {
    return this.habitsService.update(id, updateHabitDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.habitsService.remove(id);
  }
}
