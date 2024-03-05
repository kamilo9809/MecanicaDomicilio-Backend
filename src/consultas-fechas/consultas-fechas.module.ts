import { Module } from '@nestjs/common';
import { ConsultasFechasService } from './consultas-fechas.service';
import { ConsultasFechasController } from './consultas-fechas.controller';
import { Pedidos } from "../pedidos/pedidos.entity"
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pedidos])],
  providers: [ConsultasFechasService],
  controllers: [ConsultasFechasController]
})
export class ConsultasFechasModule {}
