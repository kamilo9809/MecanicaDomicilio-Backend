import { Injectable } from "@nestjs/common";

@Injectable()
export class MapaService{
    async obtenerUbicacion(): Promise<{lat: number; lng: number}>{
        return {lat: 6.24502, lng:-75.55462};
    }
}