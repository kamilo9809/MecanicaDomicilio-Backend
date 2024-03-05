import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarritoService } from "./carrito.service"
import { Carrito } from "./carrito.entity"
import { CantidadDto, CrearItemDto } from './typado/typado.cantidad';

@Controller('carrito')
export class CarritoController {
    
    constructor( private carritoService: CarritoService){}

    @Get()
    async getCarritos(): Promise<Carrito[]> {
        return this.carritoService.getCarrito()
    }

    @Delete(':id_Carrito')
    eliminarItem(@Param('id_Carrito', ParseIntPipe) id: number){
        return this.carritoService.eliminarItenm(id)
    }

    @Patch(':id_Carrito')
    updateCantidad(@Param('id_Carrito', ParseIntPipe) id: number, @Body() data: CantidadDto){
        return this.carritoService.updateCantidad(id, data)
    }

    @Post()
    CrearItem(@Body() data: CrearItemDto){
        console.log(data)
        return this.carritoService.crearItem(data)
    }

    
}
