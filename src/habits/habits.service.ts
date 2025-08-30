import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class HabitsService {

   private readonly logger = new Logger('HabitService');

  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createHabitDto: CreateHabitDto, user: User) {
   
    try {
      
      const habit = await this.habitRepository.create({
        ...createHabitDto,
        user,
      });

      return this.habitRepository.save(habit);


    } catch (error) {

      this.handleDBExceptions(error);
      
    }
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

  private handleDBExceptions(error: any) {
     if( error.code === '23505' )
        throw new BadRequestException(error.detail);

      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs');
  }


}
