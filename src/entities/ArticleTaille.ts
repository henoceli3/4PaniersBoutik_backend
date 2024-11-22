import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";

@Index("article_taille_pkey", ["id"], { unique: true })
@Entity("article_taille", { schema: "public" })
export class ArticleTaille {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "taille" })
  taille: number;

  @ManyToOne(() => Article, (article) => article.articleTailles, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;
}
