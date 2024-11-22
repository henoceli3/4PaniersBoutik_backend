import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";

@Index("categorie_pkey", ["idCategorie"], { unique: true })
@Entity("categorie", { schema: "public" })
export class Categorie {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_categorie" })
  idCategorie: number;

  @Column("character varying", { name: "libelle_categorie", length: 100 })
  libelleCategorie: string;

  @OneToMany(() => Article, (article) => article.categorie)
  articles: Article[];
}
