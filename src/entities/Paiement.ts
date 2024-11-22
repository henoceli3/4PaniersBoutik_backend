import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Commande } from "./Commande";

@Index("paiement_commande_id_key", ["commandeId"], { unique: true })
@Index("paiement_pkey", ["idPaiement"], { unique: true })
@Entity("paiement", { schema: "public" })
export class Paiement {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_paiement" })
  idPaiement: number;

  @Column("integer", { name: "commande_id", nullable: true, unique: true })
  commandeId: number | null;

  @Column("character varying", { name: "mode_paiement", length: 50 })
  modePaiement: string;

  @Column("timestamp without time zone", {
    name: "date_paiement",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  datePaiement: Date | null;

  @Column("numeric", { name: "montant", precision: 10, scale: 2 })
  montant: string;

  @OneToOne(() => Commande, (commande) => commande.paiement, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "commande_id", referencedColumnName: "idCommande" }])
  commande: Commande;
}
