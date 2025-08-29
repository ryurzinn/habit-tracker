import {IsOptional, IsString } from "class-validator";


export class CreateHabitDto {

    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    frecuencia?: string;

    @IsString()
    @IsOptional()
    categoria?: string;

}
