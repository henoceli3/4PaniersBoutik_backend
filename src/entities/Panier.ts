import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Commande } from "./Commande";
import { Utilisateur } from "./Utilisateur";
import { PanierArticle } from "./PanierArticle";

@Index("panier_pkey", ["idPanier"], { unique: true })
@Entity("panier", { schema: "public" })
export class Panier {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_panier" })
  idPanier: number;

  @Column("numeric", {
    name: "total",
    precision: 10,
    scale: 2,
    default: () => "0",
  })
  total: string;

  @Column("timestamp without time zone", {
    name: "date_creation",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreation: Date | null;

  @Column("character varying", {
    name: "status",
    nullable: true,
    length: 50,
    default: () => "'actif'",
  })
  status: string | null;

  @OneToOne(() => Commande, (commande) => commande.panier)
  commande: Commande;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.paniers, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "utilisateur_id", referencedColumnName: "idUtilisateur" },
  ])
  utilisateur: Utilisateur;

  @OneToMany(() => PanierArticle, (panierArticle) => panierArticle.panier)
  panierArticles: PanierArticle[];
}
