import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Carrito } from './carrito.entity';

@Injectable()
export class CarritoService {
    constructor(@InjectRepository(Carrito) private carritoRepository: Repository<Carrito>){}

    async getCarrito(): Promise<Carrito[]> {
        return this.carritoRepository.find({
            relations: ['usuario', 'producto', 'producto.marca', 'producto.categoria', 'producto.imagenes', 'producto.calificaciones', 'producto.precio']
        });
    }
}

