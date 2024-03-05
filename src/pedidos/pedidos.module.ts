import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedidos } from './pedidos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([ Pedidos])],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports: [PedidosModule]
})
export class PedidosModule {}
