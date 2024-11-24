import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambassadeur } from 'src/entities/Ambassadeur';
import { CreateAmbassadeurDto } from './dto/create-ambassadeur.dto';
import { UpdateAmbassadeurDto } from './dto/update-ambassadeur.dto';

@Injectable()
export class AmbassadeurService {
  constructor(
    @InjectRepository(Ambassadeur)
    private readonly ambassadeurRepository: Repository<Ambassadeur>,
  ) {}

  async create(createAmbassadeurDto: CreateAmbassadeurDto) {
    try {
      const ambassadeur =
        this.ambassadeurRepository.create(createAmbassadeurDto);
      await this.ambassadeurRepository.save(ambassadeur);
      return {
        resultat: ambassadeur,
        message: 'Ambassadeur créé avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la création de l'ambassadeur: ${error.message}`,
      };
    }
  }

  async findAll() {
    try {
      return {
        resultat: await this.ambassadeurRepository.find({
          relations: ['articles'],
        }),
        message: 'Ambassadeurs récupérés avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la récupération des ambassadeurs: ${error.message}`,
      };
    }
  }

  async findOne(id: number) {
    try {
      return {
        resultat: await this.ambassadeurRepository.findOne({
          where: { idAmbassadeur: id },
          relations: ['articles'],
        }),
        message: 'Ambassadeur récupéré avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la récupération de l'ambassadeur: ${error.message}`,
      };
    }
  }

  async update(id: number, updateAmbassadeurDto: UpdateAmbassadeurDto) {
    try {
      return {
        resultat: await this.ambassadeurRepository.update(
          id,
          updateAmbassadeurDto,
        ),
        message: 'Ambassadeur mis à jour avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la mise à jour de l'ambassadeur: ${error.message}`,
      };
    }
  }

  async remove(id: number) {
    try {
      return {
        resultat: await this.ambassadeurRepository.delete(id),
        message: 'Ambassadeur supprimé avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la suppression de l'ambassadeur: ${error.message}`,
      };
    }
  }
}
