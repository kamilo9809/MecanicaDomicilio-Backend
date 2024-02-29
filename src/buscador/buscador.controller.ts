import { Controller, Get, Query } from '@nestjs/common';
import { BuscadorService } from "./buscador.service"

@Controller('buscador')
export class BuscadorController {

    constructor(private buscadorService: BuscadorService) { }

    @Get() // Define el método GET sin especificar una ruta específica
    buscarProducto(@Query('nombre_productos') nombre_producto: string) {
        return this.buscadorService.buscarProductosPorNombre(nombre_producto);
    }
}
