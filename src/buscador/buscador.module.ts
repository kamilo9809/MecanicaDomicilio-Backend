import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { BuscadorService } from './buscador.service';
import { BuscadorController } from './buscador.controller';
import { Productos } from "../productos/productos.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Productos])], // Utiliza TypeOrmModule.forFeature() para especificar las entidades
  providers: [BuscadorService],
  controllers: [BuscadorController]
})
export class BuscadorModule {}
