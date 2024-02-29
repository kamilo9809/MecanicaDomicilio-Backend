import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import {Detalles_pedidos} from "../pedidos/detalles_pedido/detalles_pedido.entity"
import { Pedidos } from './pedidos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([ Pedidos,Detalles_pedidos])],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports: []
})
export class PedidosModule {}
