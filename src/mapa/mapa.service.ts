import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class MapaService implements OnModuleInit{

    async onModuleInit() {
        await this.initMap();    
    }

    private async initMap(): Promise<void>{
        const position = await this.obtenerUbicacion(); // Obtener la ubicación desde tu API de Google Maps

        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerView } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;


        const map = new Map(document.getElementById('map') as HTMLElement, {
        zoom: 4,
        center: position,
        mapId: 'DEMO_MAP_ID',
        });

        const marker = new AdvancedMarkerView({
        map: map,
        position: position,
        title: 'Ubicación',
        });
        console.log('mapa inicializado');
    }

    async obtenerUbicacion(): Promise<{lat: number; lng: number}>{
        // Lógica para obtener la ubicación desde la API de Google Maps
        return {lat: 6.24502, lng:-75.55462};
    }
}