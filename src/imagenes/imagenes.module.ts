import { Module } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagenes } from "./imagenes.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Imagenes])],
  providers: [ImagenesService],
  controllers: [ImagenesController]
})
export class ImagenesModule {}
