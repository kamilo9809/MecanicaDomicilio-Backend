import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Categorias } from "../categorias/categorias.entity"
import { Productos} from "./productos.entity"
import { Imagenes } from "./imagenes/imagenes.entity"
import { Precio } from "../productos/precio/precio.entity"
import { Marca } from './marca/marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificaciones } from '../calificaciones/calificaciones.entity';




@Module({
  providers: [ProductosService],
  controllers: [ProductosController],
  imports: [TypeOrmModule.forFeature([Categorias, Productos, Imagenes, Precio, Marca, Calificaciones])],//aca van las tablas q estan relacionadas 
  exports: [ProductosService]//exporta el modulo por si necesito usarlo en otros modulo 
})
export class ProductosModule {}
