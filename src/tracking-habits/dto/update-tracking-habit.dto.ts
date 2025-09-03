import { PartialType } from '@nestjs/mapped-types';
import { MarkHabitCompleteDto } from './MarkHabitComplete.dto';

export class UpdateTrackingHabitDto extends PartialType(MarkHabitCompleteDto) {}
