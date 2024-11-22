import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Panier } from "./Panier";

@Index("panier_article_pkey", ["id"], { unique: true })
@Entity("panier_article", { schema: "public" })
export class PanierArticle {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "quantité" })
  quantit: number;

  @ManyToOne(() => Article, (article) => article.panierArticles, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;

  @ManyToOne(() => Panier, (panier) => panier.panierArticles, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "panier_id", referencedColumnName: "idPanier" }])
  panier: Panier;
}
