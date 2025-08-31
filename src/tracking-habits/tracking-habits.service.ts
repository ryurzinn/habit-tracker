import { Injectable } from '@nestjs/common';
import { CreateTrackingHabitDto } from './dto/create-tracking-habit.dto';
import { UpdateTrackingHabitDto } from './dto/update-tracking-habit.dto';

@Injectable()
export class TrackingHabitsService {
  create(createTrackingHabitDto: CreateTrackingHabitDto) {
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
