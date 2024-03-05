import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Productos } from "../productos/productos.entity"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedidos } from "../pedidos/pedidos.entity"
import { Calificaciones } from "../calificaciones/calificaciones.entity"
import { Marca } from "../marca/marca.entity"
import { Categorias } from "../categorias/categorias.entity"
import { Imagenes } from "../imagenes/imagenes.entity"
import { Precio } from "../precio/precio.entity"
import { Usuarios } from "../usuarios/usuarios.entity"
import { Carrito } from "./carrito.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Productos, Pedidos, Marca, Calificaciones, Categorias, Imagenes, Precio, Usuarios, Carrito])],
  providers: [CarritoService],
  controllers: [CarritoController],
  exports: [CarritoModule]
})
export class CarritoModule {}
