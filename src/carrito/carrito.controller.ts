import { Controller, Get } from '@nestjs/common';
import { CarritoService } from "./carrito.service"
import { Carrito } from "./carrito.entity"

@Controller('carrito')
export class CarritoController {
    
    constructor( private carritoService: CarritoService){}

    @Get()
    async getCarritos(): Promise<Carrito[]> {
        return this.carritoService.getCarrito()
    }
    
}
