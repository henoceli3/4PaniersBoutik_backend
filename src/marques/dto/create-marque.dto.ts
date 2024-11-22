import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { Marque } from 'src/entities/Marque';

export class CreateMarqueDto extends PartialType(Marque) {
  @IsNotEmpty()
  @IsString()
  nomMarque: string;
}
