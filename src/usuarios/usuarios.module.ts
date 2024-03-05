import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuarios } from './usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from "../carrito/carrito.entity"
import { Pedidos } from "../pedidos/pedidos.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, Carrito, Pedidos])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService]
})
export class UsuariosModule {}
