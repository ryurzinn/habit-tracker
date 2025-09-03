import { Module } from '@nestjs/common';
import { HabitsModule } from './habits/habits.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './habits/entities/habit.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { HabitTrackingModule } from './tracking-habits/tracking-habits.module';
import { HabitCompletion } from './tracking-habits/entities/habit-completion.entity';

@Module({
  imports: [

     ConfigModule.forRoot(),
    
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Habit, User, HabitCompletion],
      synchronize: true, // ⚠️ SOLO para dev
    }),
    HabitsModule,
    AuthModule,
    HabitTrackingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
