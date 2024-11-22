import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adresse } from './Adresse';
import { Commande } from './Commande';
import { HistoriqueVente } from './HistoriqueVente';
import { Panier } from './Panier';

@Index('utilisateur_email_key', ['email'], { unique: true })
@Index('utilisateur_pkey', ['idUtilisateur'], { unique: true })
@Entity('utilisateur', { schema: 'public' })
export class Utilisateur {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_utilisateur' })
  idUtilisateur: number;

  @Column('character varying', { name: 'nom_utilisateur', length: 100 })
  nomUtilisateur: string;

  @Column('character varying', { name: 'prenom_utilisateur', length: 100 })
  prenomUtilisateur: string;

  @Column('character varying', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('character varying', { name: 'pass_utilisateur', length: 255 })
  passUtilisateur: string;

  @OneToMany(() => Adresse, (adresse) => adresse.utilisateur)
  adresses: Adresse[];

  @OneToMany(() => Commande, (commande) => commande.utilisateur)
  commandes: Commande[];

  @OneToMany(
    () => HistoriqueVente,
    (historiqueVente) => historiqueVente.utilisateur,
  )
  historiqueVentes: HistoriqueVente[];

  @OneToMany(() => Panier, (panier) => panier.utilisateur)
  paniers: Panier[];
}
