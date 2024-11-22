import { Injectable } from '@nestjs/common';
import { CreateMarqueDto } from './dto/create-marque.dto';
import { UpdateMarqueDto } from './dto/update-marque.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marque } from 'src/entities/Marque';
import { Repository } from 'typeorm';

@Injectable()
export class MarquesService {
  constructor(
    @InjectRepository(Marque)
    private readonly marqueRepository: Repository<Marque>,
  ) {}

  async create(createMarqueDto: CreateMarqueDto) {
    try {
      const marque = this.marqueRepository.create(createMarqueDto);
      await this.marqueRepository.save(marque);
      return {
        resultat: marque,
        statut: 'Marque ajoute avec succes',
      };
    } catch (error) {
      return {
        resultat: null,
        statut: `Echec d'ajout de la marque: ${error.message}`,
      };
    }
  }

  async findAll() {
    try {
      const marques = await this.marqueRepository.find();
      return {
        resultat: marques,
        statut: 'Liste des marques',
      };
    } catch (error) {
      return {
        resultat: null,
        statut: `Echec de la liste des marques: ${error.message}`,
      };
    }
  }

  async findOne(id: number) {
    try {
      const marque = await this.marqueRepository.findOneBy({ idMarque: id });
      return {
        resultat: marque,
        statut: 'Marque trouvée',
      };
    } catch (error) {
      return {
        resultat: null,
        statut: `Echec de la recherche de la marque: ${error.message}`,
      };
    }
  }

  async update(id: number, updateMarqueDto: UpdateMarqueDto) {
    try {
      await this.marqueRepository.update(id, updateMarqueDto);
      return {
        resultat: null,
        statut: 'Marque modifiée avec succes',
      };
    } catch (error) {
      return {
        resultat: null,
        statut: `Echec de la modification de la marque: ${error.message}`,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.marqueRepository.delete(id);
      return {
        resultat: null,
        statut: 'Marque supprimée avec succes',
      };
    } catch (error) {
      return {
        resultat: null,
        statut: `Echec de la suppression de la marque: ${error.message}`,
      };
    }
  }
}
