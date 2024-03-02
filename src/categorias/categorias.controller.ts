import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Categorias } from "./categorias.entity"
import { CategoriasService } from "./categorias.service"
import { UpdateCategoriaDto, CrearCategoriaDto } from "./typado/typado.categoria"

@Controller('categorias')
export class CategoriasController {

    constructor(private CategoriasService: CategoriasService){}

    //lista las gategorias
    @Get()
    getCategorias(){
        return this.CategoriasService.getCategorias()
    }

    //obtiene el id de la categoria y busca la seleccionada
    @Get(':idCategoria')
    getCategoriaId(@Param('idCategoria', ParseIntPipe) id: number ){
        return this.CategoriasService.getCategoriaId(id)
    }

    //actualiza el campo de la categoria
    @Patch(':idCategoria')
    updateCategoria(@Param('idCategoria', ParseIntPipe) id: number, @Body() data: UpdateCategoriaDto){
        return this.CategoriasService.updateCategoria(id, data)
    }

    //saca el json de la petición
    @Post()
    createCategoria(@Body() newCategoria: CrearCategoriaDto){
        return this.CategoriasService.crearCategoria(newCategoria)
    }

    //elimina las categorias
    @Delete(':idCategoria')
    eliminarCategoria(@Param('idCategoria', ParseIntPipe) id: number){
        return this.CategoriasService.eliminarCategoria(id)
    }
}

