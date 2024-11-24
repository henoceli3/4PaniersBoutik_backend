import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from 'src/entities/Commande';

@Module({
  imports: [TypeOrmModule.forFeature([Commande])],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
