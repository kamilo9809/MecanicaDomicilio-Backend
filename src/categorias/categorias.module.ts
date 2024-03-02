import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from "../categorias/categorias.entity"
import {} from "../categorias/categorias.controller"

@Module({
  imports: [TypeOrmModule.forFeature([Categorias])],
  providers: [CategoriasService],
  controllers: [CategoriasController],
  exports: [ CategoriasModule ]
})
export class CategoriasModule {}
