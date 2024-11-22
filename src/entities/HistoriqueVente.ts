import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Utilisateur } from "./Utilisateur";

@Index("historique_vente_pkey", ["idHistorique"], { unique: true })
@Entity("historique_vente", { schema: "public" })
export class HistoriqueVente {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_historique" })
  idHistorique: number;

  @Column("integer", { name: "quantité" })
  quantit: number;

  @Column("timestamp without time zone", {
    name: "date_achat",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateAchat: Date | null;

  @Column("numeric", { name: "total", precision: 10, scale: 2 })
  total: string;

  @ManyToOne(() => Article, (article) => article.historiqueVentes, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "idArticle" }])
  article: Article;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.historiqueVentes, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "utilisateur_id", referencedColumnName: "idUtilisateur" },
  ])
  utilisateur: Utilisateur;
}
