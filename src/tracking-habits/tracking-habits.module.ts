import { Module } from '@nestjs/common';
import { HabitTrackingService } from './tracking-habits.service';
import { HabitTrackingController } from './tracking-habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Habit } from 'src/habits/entities/habit.entity';
import { HabitCompletion } from './entities/habit-completion.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [HabitTrackingController],
  providers: [HabitTrackingService],
  imports: [
      AuthModule,
      TypeOrmModule.forFeature([ Habit, User, HabitCompletion]),
    ]
})
export class HabitTrackingModule {}
