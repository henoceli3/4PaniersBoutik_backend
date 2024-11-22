import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Panier } from "./Panier";

@Index("panier_article_pkey", ["id"], { unique: true })
@Entity("panier_article", { schema: "public" })
export class PanierArticle {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "article_id", nullable: true })
  articleId: number | null;

  @Column("integer", { name: "quantité" })
  quantit: number;

  @ManyToOne(() => Panier, (panier) => panier.panierArticles, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "panier_id", referencedColumnName: "idPanier" }])
  panier: Panier;
}
