import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity("categorie", { schema: "boutique_en_ligne" })
export class Categorie {
  @PrimaryGeneratedColumn({ type: "int", name: "id_categorie" })
  idCategorie: number;

  @Column("varchar", { name: "libelle_categorie", nullable: true, length: 100 })
  libelleCategorie: string | null;

  @OneToMany(() => Article, (article) => article.categorie)
  articles: Article[];
}
