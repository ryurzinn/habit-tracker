import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  imports: [
    TypeOrmModule.forFeature([ Habit, User ]),
    AuthModule
  ]
})
export class HabitsModule {}
