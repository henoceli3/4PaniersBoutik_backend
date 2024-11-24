import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from 'src/entities/Commande';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
  ) {}

  async create(createCommandeDto: CreateCommandeDto) {
    try {
      const commande = this.commandeRepository.create(createCommandeDto);
      await this.commandeRepository.save(commande);
      return {
        resultat: commande,
        message: 'Commande créée avec succès',
      };
    } catch (error) {
      return {
        resultat: null,
        message: `Erreur lors de la création de la commande: ${error.message}`,
      };
    }
  }

  async findAll() {
    try {
      const commandes = await this.commandeRepository.find({
        relations: ['utilisateur', 'panier', 'commandeArticles', 'paiement'],
      });
      return {
        resultat: commandes,
        message: 'Liste des commandes récupérée avec succès',
      };
    } catch (error) {
      return {
        resultat: null,
        message: `Erreur lors de la récupération des commandes: ${error.message}`,
      };
    }
  }

  async findOne(id: number) {
    try {
      const commande = await this.commandeRepository.findOne({
        where: { idCommande: id },
        relations: ['utilisateur', 'panier', 'commandeArticles', 'paiement'],
      });
      return {
        resultat: commande,
        message: 'Commande récupérée avec succès',
      };
    } catch (error) {
      return {
        resultat: null,
        message: `Erreur lors de la récupération de la commande: ${error.message}`,
      };
    }
  }

  async update(id: number, updateCommandeDto: UpdateCommandeDto) {
    try {
      const result = await this.commandeRepository.update(
        id,
        updateCommandeDto,
      );
      return {
        resultat: result,
        message: 'Commande mise à jour avec succès',
      };
    } catch (error) {
      return {
        resultat: null,
        message: `Erreur lors de la mise à jour de la commande: ${error.message}`,
      };
    }
  }

  async remove(id: number) {
    try {
      const result = await this.commandeRepository.delete(id);
      return {
        resultat: result,
        message: 'Commande supprimée avec succès',
      };
    } catch (error) {
      return {
        resultat: null,
        message: `Erreur lors de la suppression de la commande: ${error.message}`,
      };
    }
  }
}
