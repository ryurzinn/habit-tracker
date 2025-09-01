import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrackingHabitsService } from './tracking-habits.service';
import { MarkHabitCompleteDto } from './dto/MarkHabitComplete.dto';
import { UpdateTrackingHabitDto } from './dto/update-tracking-habit.dto';

@Controller('tracking-habits')
export class TrackingHabitsController {
  constructor(private readonly trackingHabitsService: TrackingHabitsService) {}

  @Post()
  create(@Body() createTrackingHabitDto: MarkHabitCompleteDto) {
    return this.trackingHabitsService.create(createTrackingHabitDto);
  }

  @Get()
  findAll() {
    return this.trackingHabitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingHabitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackingHabitDto: UpdateTrackingHabitDto) {
    return this.trackingHabitsService.update(+id, updateTrackingHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingHabitsService.remove(+id);
  }
}
