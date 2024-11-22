import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";

@Index("article_style_pkey", ["id"], { unique: true })
@Entity("article_style", { schema: "public" })
export class ArticleStyle {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "style", length: 100 })
  style: string;

  @ManyToOne(() => Article, (article) => article.articleStyles, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;
}
