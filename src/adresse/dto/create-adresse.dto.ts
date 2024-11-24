import { PartialType } from '@nestjs/mapped-types';
import { Adresse } from 'src/entities/Adresse';

export class CreateAdresseDto extends PartialType(Adresse) {}
