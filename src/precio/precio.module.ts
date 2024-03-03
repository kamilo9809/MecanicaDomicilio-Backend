import { Module } from '@nestjs/common';
import { PrecioService } from './precio.service';
import { PrecioController } from './precio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Precio } from "./precio.entity"


@Module({
  imports: [TypeOrmModule.forFeature([Precio])],
  providers: [PrecioService],
  controllers: [PrecioController]
})
export class PrecioModule {}
