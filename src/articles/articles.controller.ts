import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('create')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get('all')
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Put('edit/:id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
