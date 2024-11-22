import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import { Utilisateur } from 'src/entities/Utilisateur';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Utilisateur)
    private usersRepository: Repository<Utilisateur>,
  ) {}

  /**
   * Crée un nouvel utilisateur.
   * @param createUserDto - Dto contenant les informations de l'utilisateur à créer.
   * @returns - Un objet contenant le résultat de la requête et un message.
   * Si la requête est réussie, le résultat est l'utilisateur créé, sinon, le résultat est null.
   * Le message est un texte qui décrit le résultat de la requête.
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        createUserDto.passUtilisateur,
        10,
      );
      const user = this.usersRepository.create({
        ...createUserDto,
        passUtilisateur: hashedPassword,
      });
      await this.usersRepository.save(user);
      return {
        result: user,
        message: 'User Créer avec succès',
      };
    } catch (error) {
      return {
        result: null,
        message: `Erreur lors de la création de l'utilisateur: ${error.message}`,
      };
    }
  }

  /**
   * Récupère la liste de tous les utilisateurs.
   * @returns - Un objet contenant le résultat de la requête et un message.
   * Si la requête est réussie, le résultat est la liste des utilisateurs, sinon, le résultat est null.
   * Le message est un texte qui décrit le résultat de la requête.
   */
  async findAll() {
    try {
      return {
        result: await this.usersRepository.find(),
        message: 'Liste des utilisateurs',
      };
    } catch (error) {
      return {
        result: null,
        message: `Erreur lors de la récupération des utilisateurs: ${error.message}`,
      };
    }
  }

  /**
   * Récupère un utilisateur par son identifiant.
   * @param id - L'identifiant de l'utilisateur.
   * @returns - Un objet contenant le résultat de la requête et un message.
   * Si la requête est réussie, le résultat est l'utilisateur, sinon, le résultat est null.
   * Le message est un texte qui décrit le résultat de la requête.
   */
  async findOne(id: number) {
    try {
      return {
        result: await this.usersRepository.findOne({
          where: { idUtilisateur: id },
        }),
        message: 'Utilisateur trouvé',
      };
    } catch (error) {
      return {
        result: null,
        message: `Erreur lors de la récupération de l'utilisateur: ${error.message}`,
      };
    }
  }

  /**
   * Met à jour un utilisateur existant.
   * @param id - L'identifiant de l'utilisateur à mettre à jour.
   * @param updateUserDto - Dto contenant les informations de l'utilisateur à mettre à jour.
   * @returns - Un objet contenant le résultat de la requête et un message.
   * Si la requête est réussie, le résultat est la mise à jour de l'utilisateur, sinon, le résultat est null.
   * Le message est un texte qui décrit le résultat de la requête.
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return {
        result: await this.usersRepository.update(id, updateUserDto),
        message: 'Utilisateur mis à jour',
      };
    } catch (error) {
      return {
        result: null,
        message: `Erreur lors de la mise à jour de l'utilisateur: ${error.message}`,
      };
    }
  }

  /**
   * Supprime un utilisateur existant.
   * @param id - L'identifiant de l'utilisateur à supprimer.
   * @returns - Un objet contenant le résultat de la requête et un message.
   * Si la requête est réussie, le résultat est l'objet supprimé, sinon, le résultat est null.
   * Le message est un texte qui décrit le résultat de la requête.
   */
  async remove(id: number) {
    try {
      return {
        result: await this.usersRepository.delete(id),
        message: 'Utilisateur supprimé',
      };
    } catch (error) {
      return {
        result: null,
        message: `Erreur lors de la suppression de l'utilisateur: ${error.message}`,
      };
    }
  }

  /**
   * Authentifie un utilisateur avec son adresse e-mail et son mot de passe.
   * @param email - Adresse e-mail de l'utilisateur.
   * @param password - Mot de passe de l'utilisateur.
   * @returns - Un objet contenant le résultat de la requête et un message.
   * Si la requête est réussie, le résultat est l'utilisateur connecté, sinon, le résultat est null.
   * Le message est un texte qui décrit le résultat de la requête.
   * Si l'utilisateur n'est pas trouvé ou si le mot de passe est incorrect, un message approprié est retourné.
   */
  async login(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        user.passUtilisateur,
      );
      if (!isPasswordValid) {
        return {
          result: null,
          message: 'Mot de passe incorrect',
        };
      }
      return {
        result: user,
        message: 'Utilisateur connecté',
      };
    } catch (error) {
      return {
        result: null,
        message: `Erreur lors de la connexion de l'utilisateur: ${error.message}`,
      };
    }
  }
}
