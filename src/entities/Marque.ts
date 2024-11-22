import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity("marque", { schema: "boutique_en_ligne" })
export class Marque {
  @PrimaryGeneratedColumn({ type: "int", name: "id_marque" })
  idMarque: number;

  @Column("varchar", { name: "libelle_marque", nullable: true, length: 100 })
  libelleMarque: string | null;

  @OneToMany(() => Article, (article) => article.marque)
  articles: Article[];
}
