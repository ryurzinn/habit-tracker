import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { HabitTrackingService } from './tracking-habits.service';
import { MarkHabitCompleteDto } from './dto/MarkHabitComplete.dto';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('tracking')
export class HabitTrackingController {
  constructor(private readonly trackingHabitsService: HabitTrackingService) {}

  @Post(':id/complete')
  @Auth()
  create(
    @Body() markHabitCompleteHabitDto: MarkHabitCompleteDto,
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) habitId: string){
   
    return this.trackingHabitsService.markAsCompleted(markHabitCompleteHabitDto, habitId, user.id );
  }

}
