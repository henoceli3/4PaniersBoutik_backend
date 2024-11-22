import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Panier } from "./Panier";
import { Article } from "./Article";

@Index("panier_id", ["panierId"], {})
@Index("article_id", ["articleId"], {})
@Entity("panier_article", { schema: "boutique_en_ligne" })
export class PanierArticle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "panier_id", nullable: true })
  panierId: number | null;

  @Column("int", { name: "article_id", nullable: true })
  articleId: number | null;

  @Column("int", { name: "quantité", nullable: true })
  quantit: number | null;

  @ManyToOne(() => Panier, (panier) => panier.panierArticles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "panier_id", referencedColumnName: "idPanier" }])
  panier: Panier;

  @ManyToOne(() => Article, (article) => article.panierArticles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;
}
