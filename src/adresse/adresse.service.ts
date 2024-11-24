import { Injectable } from '@nestjs/common';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adresse } from 'src/entities/Adresse';

@Injectable()
export class AdresseService {
  constructor(
    @InjectRepository(Adresse)
    private readonly adresseRepository: Repository<Adresse>,
  ) {}

  async create(createAdresseDto: CreateAdresseDto) {
    try {
      const adresse = this.adresseRepository.create(createAdresseDto);
      await this.adresseRepository.save(adresse);
      return {
        resultat: adresse,
        message: 'Adresse créée avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la création de l'adresse: ${error.message}`,
      };
    }
  }

  async findAll() {
    try {
      const adresses = await this.adresseRepository.find({
        relations: ['utilisateur'],
      });
      return {
        resultat: adresses,
        message: 'Adresses récupérées avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la récupération des adresses: ${error.message}`,
      };
    }
  }

  async findOne(id: number) {
    try {
      return {
        resultat: await this.adresseRepository.findOne({
          where: { idAdresse: id },
          relations: ['utilisateur'],
        }),
        message: 'Adresse récupérée avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la récupération de l'adresse: ${error.message}`,
      };
    }
  }

  async update(id: number, updateAdresseDto: UpdateAdresseDto) {
    try {
      return {
        resultat: await this.adresseRepository.update(id, updateAdresseDto),
        message: 'Adresse mise à jour avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la mise à jour de l'adresse: ${error.message}`,
      };
    }
  }

  async remove(id: number) {
    try {
      return {
        resultat: await this.adresseRepository.delete(id),
        message: 'Adresse supprimée avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la suppression de l'adresse: ${error.message}`,
      };
    }
  }
}
