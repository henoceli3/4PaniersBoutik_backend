import { Module } from '@nestjs/common';
import { AmbassadeurService } from './ambassadeur.service';
import { AmbassadeurController } from './ambassadeur.controller';
import { Ambassadeur } from 'src/entities/Ambassadeur';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ambassadeur])],
  controllers: [AmbassadeurController],
  providers: [AmbassadeurService],
})
export class AmbassadeurModule {}
