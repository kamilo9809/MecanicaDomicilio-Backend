import { Controller, Get, Post, Param, Delete, Body, Patch, ParseIntPipe } from '@nestjs/common';
import { ImagenesService } from "./imagenes.service"
import { ImagenesDto } from './typado/crear-typado.typado';


@Controller('imagenes')
export class ImagenesController {

    constructor( private ImagenesService: ImagenesService){}

    //obtiene las imagenes accediendo a la classe ImagenesService y utilizando el metodo getImagenes
    @Get()
    getImagenes(){
        return this.ImagenesService.getImagenes()
    }

    //crea una imagen
    @Post()
    crearImagenen(@Body() data: ImagenesDto){
        return this.ImagenesService.crearImagen(data)
    }

    //elimina una imagen pasando el id de la imagen
    @Delete(':idImagenes')
    eliminar(@Param('idImagenes', ParseIntPipe) id: number){
        return this.ImagenesService.eliminaImagen(id)
    }

    //actualiza la imagen
    @Patch(':idImagenes')
    updateImagen(@Param('idImagenes', ParseIntPipe) id: number, @Body() data: ImagenesDto){
        return this.ImagenesService.updateImagen(id, data)
    }

    //obtiene la imagen q quieras pasando el id de la misma
    @Get(':idImagenes')
    getImagen(@Param('idImagenes', ParseIntPipe) id: number){
        return this.ImagenesService.getImagen(id)
    }
}
