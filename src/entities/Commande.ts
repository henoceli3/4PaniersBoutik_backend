import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Panier } from "./Panier";
import { CommandeArticle } from "./CommandeArticle";
import { Paiement } from "./Paiement";

@Index("user_id", ["userId"], {})
@Index("panier_id", ["panierId"], {})
@Entity("commande", { schema: "boutique_en_ligne" })
export class Commande {
  @PrimaryGeneratedColumn({ type: "int", name: "id_commande" })
  idCommande: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "panier_id", nullable: true })
  panierId: number | null;

  @Column("datetime", {
    name: "date_commande",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCommande: Date | null;

  @Column("enum", {
    name: "status",
    nullable: true,
    enum: ["en_cours", "livree", "annulee"],
    default: () => "'en_cours'",
  })
  status: "en_cours" | "livree" | "annulee" | null;

  @Column("decimal", { name: "total", nullable: true, precision: 10, scale: 2 })
  total: string | null;

  @ManyToOne(() => User, (user) => user.commandes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "idUser" }])
  user: User;

  @ManyToOne(() => Panier, (panier) => panier.commandes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "panier_id", referencedColumnName: "idPanier" }])
  panier: Panier;

  @OneToMany(
    () => CommandeArticle,
    (commandeArticle) => commandeArticle.commande
  )
  commandeArticles: CommandeArticle[];

  @OneToMany(() => Paiement, (paiement) => paiement.commande)
  paiements: Paiement[];
}
