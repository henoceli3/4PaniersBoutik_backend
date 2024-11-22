import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Commande } from "./Commande";

@Index("commande_article_pkey", ["id"], { unique: true })
@Entity("commande_article", { schema: "public" })
export class CommandeArticle {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "quantité" })
  quantit: number;

  @ManyToOne(() => Article, (article) => article.commandeArticles, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;

  @ManyToOne(() => Commande, (commande) => commande.commandeArticles, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "commande_id", referencedColumnName: "idCommande" }])
  commande: Commande;
}
