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

@Index("categorie_id", ["categorieId"], {})
@Index("marque_id", ["marqueId"], {})
@Entity("article", { schema: "boutique_en_ligne" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "id_article" })
  idArticle: number;

  @Column("varchar", { name: "titre_article", nullable: true, length: 200 })
  titreArticle: string | null;

  @Column("int", { name: "categorie_id", nullable: true })
  categorieId: number | null;

  @Column("int", { name: "marque_id", nullable: true })
  marqueId: number | null;

  @Column("decimal", { name: "prix", nullable: true, precision: 10, scale: 2 })
  prix: string | null;

  @ManyToOne(() => Categorie, (categorie) => categorie.articles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "categorie_id", referencedColumnName: "idCategorie" }])
  categorie: Categorie;

  @ManyToOne(() => Marque, (marque) => marque.articles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
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
