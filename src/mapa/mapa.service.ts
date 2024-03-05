import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class MapaService implements OnModuleInit {

    async onModuleInit() {
        await this.initMap();
    }

    private async initMap(): Promise<void> {
        const position = await this.obtenerUbicacion(); // Obtener la ubicación desde tu API de Google Maps

        // Aquí va el código para inicializar el mapa y colocar el marcador

        console.log('mapa inicializado');
    }

    async obtenerUbicacion(): Promise<{ lat: number; lng: number }> {
        // Lógica para obtener la ubicación desde la API de Google Maps
        return { lat: 6.24502, lng: -75.55462 };
    }
}

