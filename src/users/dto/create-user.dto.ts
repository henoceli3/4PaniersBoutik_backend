import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entities/User';

export class CreateUserDto extends PartialType(User) {
  @IsNotEmpty()
  @IsString()
  nomUser: string;

  @IsNotEmpty()
  @IsString()
  prenomUser: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  passUser: string;
}
