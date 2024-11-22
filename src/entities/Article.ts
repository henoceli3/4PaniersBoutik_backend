import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ambassadeur } from './Ambassadeur';
import { Categorie } from './Categorie';
import { Marque } from './Marque';
import { ArticleCouleur } from './ArticleCouleur';
import { ArticleStyle } from './ArticleStyle';
import { ArticleTaille } from './ArticleTaille';

@Index('article_pkey', ['idArticle'], { unique: true })
@Entity('article', { schema: 'public' })
export class Article {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_article' })
  idArticle: number;

  @Column('character varying', { name: 'titre_article', length: 255 })
  titreArticle: string;

  @Column('numeric', { name: 'prix', precision: 10, scale: 2 })
  prix: string;

  @Column('integer', { name: 'quantité' })
  quantit: number;

  @Column('character varying', {
    name: 'championnat',
    nullable: true,
    length: 100,
  })
  championnat: string | null;

  @Column('integer', { name: 'annee_edition', nullable: true })
  anneeEdition: number | null;

  @Column('character varying', { name: 'equipe', nullable: true, length: 100 })
  equipe: string | null;

  @Column('text', { name: 'overview', nullable: true })
  overview: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('character varying', {
    name: 'colors_name',
    nullable: true,
    length: 255,
  })
  colorsName: string | null;

  @ManyToOne(() => Ambassadeur, (ambassadeur) => ambassadeur.articles, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([
    { name: 'ambassadeur_id', referencedColumnName: 'idAmbassadeur' },
  ])
  ambassadeur: Ambassadeur;

  @ManyToOne(() => Categorie, (categorie) => categorie.articles, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'categorie_id', referencedColumnName: 'idCategorie' }])
  categorie: Categorie;

  @ManyToOne(() => Marque, (marque) => marque.articles, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'marque_id', referencedColumnName: 'idMarque' }])
  marque: Marque;

  @OneToMany(() => ArticleCouleur, (articleCouleur) => articleCouleur.article)
  articleCouleurs: ArticleCouleur[];

  @OneToMany(() => ArticleStyle, (articleStyle) => articleStyle.article)
  articleStyles: ArticleStyle[];

  @OneToMany(() => ArticleTaille, (articleTaille) => articleTaille.article)
  articleTailles: ArticleTaille[];
}
