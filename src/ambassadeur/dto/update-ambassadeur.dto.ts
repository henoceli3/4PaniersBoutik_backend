import { PartialType } from '@nestjs/mapped-types';
import { CreateAmbassadeurDto } from './create-ambassadeur.dto';

export class UpdateAmbassadeurDto extends PartialType(CreateAmbassadeurDto) {}
