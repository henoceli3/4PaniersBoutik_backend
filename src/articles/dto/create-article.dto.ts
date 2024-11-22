import { PartialType } from '@nestjs/mapped-types';
import { Article } from 'src/entities/Article';

export class CreateArticleDto extends PartialType(Article) {}
