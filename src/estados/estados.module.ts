import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { Pedidos } from "../pedidos/pedidos.entity"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from "../productos/productos.entity"
import { Usuarios } from "../usuarios/usuarios.entity"
import { Carrito } from "../carrito/carrito.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Pedidos, Carrito, Productos, Usuarios])],
  providers: [EstadosService],
  controllers: [EstadosController]
})
export class EstadosModule {}
