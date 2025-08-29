import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class HabitsService {

  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>
  ) {}

  async create(createHabitDto: CreateHabitDto) {
    const newHabit = await this.habitRepository.create(createHabitDto);
    return await this.habitRepository.save(newHabit);
  }

  async findAll() {
    return await this.habitRepository.find();
  }

  async findOne(id: string) {
    return await this.habitRepository.findOneBy({id: id});
  }

  async update(id: string, updateHabitDto: UpdateHabitDto) {
     
    const habit = await this.habitRepository.preload({ id ,...updateHabitDto});
    if(!habit) throw new NotFoundException("Habit doesn't exist");
  
    return await this.habitRepository.save(habit);

  }

  async remove(id: string) {
    return await this.habitRepository.delete(id);
  }
}
