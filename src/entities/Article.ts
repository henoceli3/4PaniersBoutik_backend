import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categorie } from "./Categorie";
import { Marque } from "./Marque";
import { CommandeArticle } from "./CommandeArticle";
import { HistoriqueVente } from "./HistoriqueVente";
import { PanierArticle } from "./PanierArticle";

@Index("article_pkey", ["idArticle"], { unique: true })
@Entity("article", { schema: "public" })
export class Article {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_article" })
  idArticle: number;

  @Column("character varying", { name: "titre_article", length: 255 })
  titreArticle: string;

  @Column("numeric", { name: "prix", precision: 10, scale: 2 })
  prix: string;

  @ManyToOne(() => Categorie, (categorie) => categorie.articles, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "categorie_id", referencedColumnName: "idCategorie" }])
  categorie: Categorie;

  @ManyToOne(() => Marque, (marque) => marque.articles, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "marque_id", referencedColumnName: "idMarque" }])
  marque: Marque;

  @OneToMany(
    () => CommandeArticle,
    (commandeArticle) => commandeArticle.article
  )
  commandeArticles: CommandeArticle[];

  @OneToMany(
    () => HistoriqueVente,
    (historiqueVente) => historiqueVente.article
  )
  historiqueVentes: HistoriqueVente[];

  @OneToMany(() => PanierArticle, (panierArticle) => panierArticle.article)
  panierArticles: PanierArticle[];
}
