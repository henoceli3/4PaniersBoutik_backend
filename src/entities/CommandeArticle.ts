import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Commande } from "./Commande";
import { Article } from "./Article";

@Index("commande_id", ["commandeId"], {})
@Index("article_id", ["articleId"], {})
@Entity("commande_article", { schema: "boutique_en_ligne" })
export class CommandeArticle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "commande_id", nullable: true })
  commandeId: number | null;

  @Column("int", { name: "article_id", nullable: true })
  articleId: number | null;

  @Column("int", { name: "quantité", nullable: true })
  quantit: number | null;

  @ManyToOne(() => Commande, (commande) => commande.commandeArticles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "commande_id", referencedColumnName: "idCommande" }])
  commande: Commande;

  @ManyToOne(() => Article, (article) => article.commandeArticles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;
}
