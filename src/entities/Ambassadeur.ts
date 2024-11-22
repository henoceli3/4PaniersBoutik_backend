import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";

@Index("ambassadeur_pkey", ["idAmbassadeur"], { unique: true })
@Entity("ambassadeur", { schema: "public" })
export class Ambassadeur {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_ambassadeur" })
  idAmbassadeur: number;

  @Column("character varying", { name: "nom_ambassadeur", length: 100 })
  nomAmbassadeur: string;

  @OneToMany(() => Article, (article) => article.ambassadeur)
  articles: Article[];
}
