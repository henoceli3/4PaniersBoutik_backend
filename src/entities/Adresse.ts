import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Utilisateur } from "./Utilisateur";

@Index("adresse_pkey", ["idAdresse"], { unique: true })
@Entity("adresse", { schema: "public" })
export class Adresse {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_adresse" })
  idAdresse: number;

  @Column("character varying", { name: "adresse_ligne1", length: 255 })
  adresseLigne1: string;

  @Column("character varying", {
    name: "adresse_ligne2",
    nullable: true,
    length: 255,
  })
  adresseLigne2: string | null;

  @Column("character varying", { name: "ville", length: 100 })
  ville: string;

  @Column("character varying", { name: "code_postal", length: 20 })
  codePostal: string;

  @Column("character varying", { name: "pays", length: 100 })
  pays: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.adresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "utilisateur_id", referencedColumnName: "idUtilisateur" },
  ])
  utilisateur: Utilisateur;
}
