import { PartialType } from '@nestjs/mapped-types';
import { Ambassadeur } from 'src/entities/Ambassadeur';

export class CreateAmbassadeurDto extends PartialType(Ambassadeur) {}
