import { IsDate, IsDateString, IsOptional, IsString } from "class-validator";

export class MarkHabitCompleteDto {

    //TODO: corregir esto cuando me ande bien el internet

    @IsOptional()
    @IsDateString()
    date?: Date;

    @IsString()
    @IsOptional()
    notes?: string;

}
