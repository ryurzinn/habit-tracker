import { Injectable, NotFoundException } from '@nestjs/common';
import { MarkHabitCompleteDto } from './dto/MarkHabitComplete.dto';
import { UpdateTrackingHabitDto } from './dto/update-tracking-habit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from 'src/habits/entities/habit.entity';
import { Repository } from 'typeorm';
import { HabitCompletion } from './entities/habit-completion.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class HabitTrackingService {

  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,

    @InjectRepository(HabitCompletion)
    private readonly habitCompletionRepository: Repository<HabitCompletion>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async markAsCompleted(markHabitCompleteHabitDto: MarkHabitCompleteDto, habitId: string, userId: string) {

    const habit = await this.habitRepository.findOne({
      where: {id: habitId, user: {id: userId}}
    });
    if(!habit) throw new NotFoundException('habit not found or does not belong to user');



    const completed = this.habitCompletionRepository.create({
      ...markHabitCompleteHabitDto,
      habit,
      user: {id: userId},
    });

    if(!habit)return await this.habitCompletionRepository.save(completed); 

  }

}
