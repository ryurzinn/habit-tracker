import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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


  async createCompletion(markHabitCompleteHabitDto: MarkHabitCompleteDto, habitId: string, user: User) {

     const { date = new Date().toISOString().split('t')[0] } = markHabitCompleteHabitDto;

    // Verificar si el habito existe y pertenece al usuario
    const habit = await this.habitRepository.findOne({
      where: {id: habitId, user: user}
    });

    if(!habit) 
      throw new NotFoundException('habit not found or does not belong to user');


    // Verificar si no se completo antes 
    const existingComplete = await this.habitCompletionRepository.findOne({
      where: {
        completedDate: new Date(date),
        habit: {id: habitId},
        user: {id: user.id},
      }
    });

    if(existingComplete) 
      throw new ConflictException('Habit already completed for this date');

    // completar un nuevo habito
    const completion = this.habitCompletionRepository.create({
      ...markHabitCompleteHabitDto,
      habit,
      user,
      completedDate: new Date(date)
    });

    return await this.habitCompletionRepository.save(completion); 

  }


  async getHabitProgress(markHabitCompleteHabitDto: MarkHabitCompleteDto, habitId: string, user: User) {

    // Verificar si el habito existe y pertenece al usuario
    const habit = await this.habitRepository.findOne({
      where: {id: habitId, user: user}
    });

    if(!habit) 
      throw new NotFoundException('habit not found or does not belong to user');

    const completions: HabitCompletion[] = await this.habitCompletionRepository.find({
      where: {
        habit: {id: habitId},
        user: {id: user.id},
      },
      order: {completedDate: 'DESC'}
    });

    return {
      habitId,
      habitTitle: habit.nombre,
      markHabitCompleteHabitDto,
      totalCompletions: completions?.length
    }
  }

  //TODO: /// CREAR CURRENT STREAK
  private calculateCurrentStreak(completions: HabitCompletion[]): number {
    if (completions.length === 0) return 0;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let streak = 0;
    let currentDate = new Date();

    const lastCompletion = new Date(completions[0].completedDate!);

    if( this.isSameDate(lastCompletion, today) ) { // Completado hoy
      streak = 1;
      currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - 1);
    } else if( this.isSameDate(lastCompletion, yesterday) ){ // Completado ayer
      streak = 1;
      currentDate = new Date(yesterday);
      currentDate.setDate(currentDate.getDate() - 1);
    } else{
      return 0; // esto significa que la racha es 0
    }

    for( let i = 1; i < completions.length; i++){
      const completionDate = new Date(completions[i].completedDate!);
      if(  this.isSameDate( completionDate, lastCompletion) ) {
        streak++;      
        currentDate.setDate(currentDate.getDate() - 1)
      } else{
        break;
      }
    }
     return streak;
  }


  private isSameDate(date1: Date, date2: Date): boolean {
    return ( date1.toDateString() === date2.toDateString() );
  }
}
