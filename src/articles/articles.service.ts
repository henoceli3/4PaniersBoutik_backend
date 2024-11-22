import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/Article';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  /**
   * Cr e un nouvel article en base de donn es.
   * @param createArticleDto Les informations de l'article   cr er.
   * @returns Un objet contenant l'article cr  et un message de succ s.
   *          Si une erreur survient, l'objet contiendra un message d'erreur.
   */
  async create(createArticleDto: CreateArticleDto) {
    try {
      const article = this.articleRepository.create(createArticleDto);
      await this.articleRepository.save(article);
      return {
        resultat: article,
        message: 'Article créé avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la création de l'article: ${error.message}`,
      };
    }
  }

  /**
   * R cup re tous les articles en base de donn es.
   * @returns Un objet contenant le r sultat de la requ te et un message.
   *          Si la requ te est r ussie, le r sultat contient la liste des articles, sinon, le r sultat est null.
   *          Le message est un texte qui d crit le r sultat de la requ te.
   */
  async findAll() {
    try {
      const articles = await this.articleRepository.find({
        relations: [
          'ambassadeur',
          'categorie',
          'marque',
          'articleCouleurs',
          'articleStyles',
          'articleTailles',
        ],
      });
      return {
        resultat: articles,
        message: 'Articles récupérés avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la récupération des articles: ${error.message}`,
      };
    }
  }

  /**
   * Récupère un article par son identifiant.
   * @param id - L'identifiant de l'article.
   * @returns - Un objet contenant le résultat de la requête et un message.
   * Si la requête est réussie, le résultat est l'article, sinon, le résultat est null.
   * Le message est un texte qui décrit le résultat de la requête.
   */
  async findOne(id: number) {
    try {
      return {
        resultat: await this.articleRepository.findOne({
          where: { idArticle: id },
          relations: [
            'ambassadeur',
            'categorie',
            'marque',
            'articleCouleurs',
            'articleStyles',
            'articleTailles',
          ],
        }),
        message: 'Article récupéré avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la récupération de l'article: ${error.message}`,
      };
    }
  }

  /**
   * Met   jour un article existant.
   * @param id - L'identifiant de l'article   mettre   jour.
   * @param updateArticleDto - Dto contenant les informations de l'article   mettre   jour.
   * @returns - Un objet contenant le r sultat de la requ te et un message.
   * Si la requ te est r ussie, le r sultat est l'article mis   jour, sinon, le r sultat est null.
   * Le message est un texte qui d crit le r sultat de la requ te.
   */
  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      return {
        resultat: await this.articleRepository.update(id, updateArticleDto),
        message: 'Article mis à jour avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la mise à jour de l'article: ${error.message}`,
      };
    }
  }

  /**
   * Supprime un article existant.
   * @param id - L'identifiant de l'article   supprimer.
   * @returns - Un objet contenant le r sultat de la requ te et un message.
   * Si la requ te est r ussie, le r sultat est l'objet supprim , sinon, le r sultat est null.
   * Le message est un texte qui d crit le r sultat de la requ te.
   */
  async remove(id: number) {
    try {
      return {
        resultat: await this.articleRepository.delete(id),
        message: 'Article supprimé avec succès',
      };
    } catch (error) {
      return {
        message: `Erreur lors de la suppression de l'article: ${error.message}`,
      };
    }
  }
}
