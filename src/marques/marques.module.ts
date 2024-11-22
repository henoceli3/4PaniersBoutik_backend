import { Module } from '@nestjs/common';
import { MarquesService } from './marques.service';
import { MarquesController } from './marques.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marque } from 'src/entities/Marque';

@Module({
  imports: [TypeOrmModule.forFeature([Marque])],
  controllers: [MarquesController],
  providers: [MarquesService],
})
export class MarquesModule {}
