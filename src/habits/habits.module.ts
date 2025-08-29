import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  imports: [TypeOrmModule.forFeature([
    Habit
  ])]
})
export class HabitsModule {}
