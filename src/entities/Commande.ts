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
import { Panier } from "./Panier";
import { Utilisateur } from "./Utilisateur";
import { CommandeArticle } from "./CommandeArticle";
import { Paiement } from "./Paiement";

@Index("commande_pkey", ["idCommande"], { unique: true })
@Index("commande_panier_id_key", ["panierId"], { unique: true })
@Entity("commande", { schema: "public" })
export class Commande {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_commande" })
  idCommande: number;

  @Column("integer", { name: "panier_id", nullable: true, unique: true })
  panierId: number | null;

  @Column("timestamp without time zone", {
    name: "date_commande",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCommande: Date | null;

  @Column("character varying", {
    name: "status",
    nullable: true,
    length: 50,
    default: () => "'en cours'",
  })
  status: string | null;

  @Column("numeric", { name: "total", precision: 10, scale: 2 })
  total: string;

  @OneToOne(() => Panier, (panier) => panier.commande, { onDelete: "SET NULL" })
  @JoinColumn([{ name: "panier_id", referencedColumnName: "idPanier" }])
  panier: Panier;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.commandes, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "utilisateur_id", referencedColumnName: "idUtilisateur" },
  ])
  utilisateur: Utilisateur;

  @OneToMany(
    () => CommandeArticle,
    (commandeArticle) => commandeArticle.commande
  )
  commandeArticles: CommandeArticle[];

  @OneToOne(() => Paiement, (paiement) => paiement.commande)
  paiement: Paiement;
}
