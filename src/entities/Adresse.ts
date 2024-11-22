import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Index('user_id', ['userId'], {})
@Entity('adresse', { schema: 'boutique_en_ligne' })
export class Adresse {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_adresse' })
  idAdresse: number;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('varchar', { name: 'adresse_ligne1', nullable: true, length: 255 })
  adresseLigne1: string | null;

  @Column('varchar', { name: 'adresse_ligne2', nullable: true, length: 255 })
  adresseLigne2: string | null;

  @Column('varchar', { name: 'ville', nullable: true, length: 100 })
  ville: string | null;

  @Column('varchar', { name: 'code_postal', nullable: true, length: 20 })
  codePostal: string | null;

  @Column('varchar', { name: 'pays', nullable: true, length: 100 })
  pays: string | null;

  @ManyToOne(() => User, (user) => user.adresses, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'idUser' }])
  user: User;
}
