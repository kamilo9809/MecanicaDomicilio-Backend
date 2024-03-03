import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PrecioService } from "./precio.service"
import { PrecioTypadDto } from "./typado/typado.typado.precio"
import { Precio } from "./precio.entity"
import path from 'path';

@Controller('precio')
export class PrecioController {

    constructor(private precioService: PrecioService){}

    // Obtener todos los precios
    @Get()
    async obtenerTodosLosPrecios(): Promise<Precio[]> {
        return await this.precioService.obtenerTodosLosPrecios();
    }

    // Obtener un precio por su ID
    @Get(':id')
    async obtenerPrecioPorId(@Param('id', ParseIntPipe) id: number): Promise<Precio> {
        return await this.precioService.obtenerPrecioPorId(id);
    }

    // Crear un nuevo precio
    @Post()
    async crearPrecio(@Body() precioDto: PrecioTypadDto): Promise<Precio> {
        return await this.precioService.crearPrecio(precioDto);
    }

    // Actualizar un precio existente
    @Patch(':id')
    async actualizarPrecio(@Param('id', ParseIntPipe) id: number, @Body() precioDto: PrecioTypadDto){
        return await this.precioService.actualizarPrecio(id, precioDto);
    }

    // Eliminar un precio
    @Delete(':id')
    async eliminarPrecio(@Param('id', ParseIntPipe) id: number){
        return this.precioService.eliminarPrecio(id);
    }
}
