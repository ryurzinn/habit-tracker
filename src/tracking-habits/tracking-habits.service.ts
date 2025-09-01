import { Injectable } from '@nestjs/common';
import { MarkHabitCompleteDto } from './dto/MarkHabitComplete.dto';
import { UpdateTrackingHabitDto } from './dto/update-tracking-habit.dto';

@Injectable()
export class TrackingHabitsService {
  create(createTrackingHabitDto: MarkHabitCompleteDto) {
    return 'This action adds a new trackingHabit';
  }

  findAll() {
    return `This action returns all trackingHabits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trackingHabit`;
  }

  update(id: number, updateTrackingHabitDto: UpdateTrackingHabitDto) {
    return `This action updates a #${id} trackingHabit`;
  }

  remove(id: number) {
    return `This action removes a #${id} trackingHabit`;
  }
}
