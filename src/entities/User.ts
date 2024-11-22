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

@Index('email', ['email'], { unique: true })
@Entity('user', { schema: 'boutique_en_ligne' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_user' })
  idUser: number;

  @Column('varchar', { name: 'nom_user', nullable: true, length: 100 })
  nomUser: string | null;

  @Column('varchar', { name: 'prenom_user', nullable: true, length: 100 })
  prenomUser: string | null;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 150,
  })
  email: string | null;

  @Column('varchar', { name: 'pass_user', nullable: true, length: 255 })
  passUser: string | null;

  @OneToMany(() => Adresse, (adresse) => adresse.user)
  adresses: Adresse[];

  @OneToMany(() => Commande, (commande) => commande.user)
  commandes: Commande[];

  @OneToMany(() => HistoriqueVente, (historiqueVente) => historiqueVente.user)
  historiqueVentes: HistoriqueVente[];

  @OneToMany(() => Panier, (panier) => panier.user)
  paniers: Panier[];
}
