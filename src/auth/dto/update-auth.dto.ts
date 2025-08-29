import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto as CreateUserDto } from './create-auth.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
