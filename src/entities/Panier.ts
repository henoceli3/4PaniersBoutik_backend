import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Commande } from "./Commande";
import { User } from "./User";
import { PanierArticle } from "./PanierArticle";

@Index("user_id", ["userId"], {})
@Entity("panier", { schema: "boutique_en_ligne" })
export class Panier {
  @PrimaryGeneratedColumn({ type: "int", name: "id_panier" })
  idPanier: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("decimal", { name: "total", nullable: true, precision: 10, scale: 2 })
  total: string | null;

  @Column("datetime", {
    name: "date_creation",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreation: Date | null;

  @Column("enum", {
    name: "status",
    nullable: true,
    enum: ["actif", "abandonne", "valide"],
    default: () => "'actif'",
  })
  status: "actif" | "abandonne" | "valide" | null;

  @OneToMany(() => Commande, (commande) => commande.panier)
  commandes: Commande[];

  @ManyToOne(() => User, (user) => user.paniers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "idUser" }])
  user: User;

  @OneToMany(() => PanierArticle, (panierArticle) => panierArticle.panier)
  panierArticles: PanierArticle[];
}
