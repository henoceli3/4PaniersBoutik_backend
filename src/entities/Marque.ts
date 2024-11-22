import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";

@Index("marque_pkey", ["idMarque"], { unique: true })
@Entity("marque", { schema: "public" })
export class Marque {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_marque" })
  idMarque: number;

  @Column("character varying", { name: "libelle_marque", length: 100 })
  libelleMarque: string;

  @OneToMany(() => Article, (article) => article.marque)
  articles: Article[];
}
