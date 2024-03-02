import { Module } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { Calificaciones } from "./calificaciones.entity"
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ProductosModule } from "../productos/productos.module"

@Module({
  imports: [TypeOrmModule.forFeature([Calificaciones]),ProductosModule ],
  providers: [CalificacionesService],
  controllers: [CalificacionesController]
})
export class CalificacionesModule {}
