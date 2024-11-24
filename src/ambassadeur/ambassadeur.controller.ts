import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmbassadeurService } from './ambassadeur.service';
import { CreateAmbassadeurDto } from './dto/create-ambassadeur.dto';
import { UpdateAmbassadeurDto } from './dto/update-ambassadeur.dto';

@Controller('ambassadeur')
export class AmbassadeurController {
  constructor(private readonly ambassadeurService: AmbassadeurService) {}

  @Post()
  create(@Body() createAmbassadeurDto: CreateAmbassadeurDto) {
    return this.ambassadeurService.create(createAmbassadeurDto);
  }

  @Get()
  findAll() {
    return this.ambassadeurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ambassadeurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmbassadeurDto: UpdateAmbassadeurDto) {
    return this.ambassadeurService.update(+id, updateAmbassadeurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ambassadeurService.remove(+id);
  }
}
