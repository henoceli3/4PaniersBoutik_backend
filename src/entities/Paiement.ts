import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Commande } from "./Commande";

@Index("commande_id", ["commandeId"], {})
@Entity("paiement", { schema: "boutique_en_ligne" })
export class Paiement {
  @PrimaryGeneratedColumn({ type: "int", name: "id_paiement" })
  idPaiement: number;

  @Column("int", { name: "commande_id", nullable: true })
  commandeId: number | null;

  @Column("enum", {
    name: "mode_paiement",
    nullable: true,
    enum: ["carte", "mobile_money", "virement"],
    default: () => "'carte'",
  })
  modePaiement: "carte" | "mobile_money" | "virement" | null;

  @Column("datetime", {
    name: "date_paiement",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  datePaiement: Date | null;

  @Column("decimal", {
    name: "montant",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  montant: string | null;

  @ManyToOne(() => Commande, (commande) => commande.paiements, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "commande_id", referencedColumnName: "idCommande" }])
  commande: Commande;
}
