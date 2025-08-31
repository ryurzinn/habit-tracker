import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackingHabitDto } from './create-tracking-habit.dto';

export class UpdateTrackingHabitDto extends PartialType(CreateTrackingHabitDto) {}
