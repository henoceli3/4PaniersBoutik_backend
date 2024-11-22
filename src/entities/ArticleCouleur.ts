import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";

@Index("article_couleur_pkey", ["id"], { unique: true })
@Entity("article_couleur", { schema: "public" })
export class ArticleCouleur {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "url_couleur" })
  urlCouleur: string;

  @ManyToOne(() => Article, (article) => article.articleCouleurs, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;
}
