import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Article } from "./Article";

@Index("user_id", ["userId"], {})
@Index("article_id", ["articleId"], {})
@Entity("historique_vente", { schema: "boutique_en_ligne" })
export class HistoriqueVente {
  @PrimaryGeneratedColumn({ type: "int", name: "id_historique" })
  idHistorique: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "article_id", nullable: true })
  articleId: number | null;

  @Column("int", { name: "quantité", nullable: true })
  quantit: number | null;

  @Column("datetime", {
    name: "date_achat",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateAchat: Date | null;

  @Column("decimal", { name: "total", nullable: true, precision: 10, scale: 2 })
  total: string | null;

  @ManyToOne(() => User, (user) => user.historiqueVentes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "idUser" }])
  user: User;

  @ManyToOne(() => Article, (article) => article.historiqueVentes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;
}
