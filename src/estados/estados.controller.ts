import { Controller, Get, Query } from '@nestjs/common';
import { EstadosService } from "./estados.service"

@Controller('estados')
export class EstadosController {

    constructor(private estadosService: EstadosService){}

    @Get()
    async getEstado(@Query('estado') estado: string){
        return await this.estadosService.getEstado(estado);
    }
}
