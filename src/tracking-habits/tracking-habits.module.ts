import { Module } from '@nestjs/common';
import { TrackingHabitsService } from './tracking-habits.service';
import { TrackingHabitsController } from './tracking-habits.controller';

@Module({
  controllers: [TrackingHabitsController],
  providers: [TrackingHabitsService],
})
export class TrackingHabitsModule {}
