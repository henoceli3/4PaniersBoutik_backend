import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { Utilisateur } from 'src/entities/Utilisateur';

export class CreateUserDto extends PartialType(Utilisateur) {
  @IsNotEmpty()
  @IsString()
  nomUtilisateur: string;

  @IsNotEmpty()
  @IsString()
  prenomUtilisateur: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  passUtilisateur: string;
}
