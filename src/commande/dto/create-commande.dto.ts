import { PartialType } from '@nestjs/mapped-types';
import { Commande } from 'src/entities/Commande';

export class CreateCommandeDto extends PartialType(Commande) {}
