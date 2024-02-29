import { Controller, Get } from "@nestjs/common";
import { MapaService } from "./mapa.service";

@Controller('mapa')
export class MapaController {
    constructor(private readonly mapaService:MapaService) {}

    @Get('/ubicacion')
    async obtenerUbicacion(): Promise<{lat: number; lng:number}>{
        return this.mapaService.obtenerUbicacion();
    }
}