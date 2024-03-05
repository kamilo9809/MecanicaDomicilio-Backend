import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
import { Pedidos } from "../pedidos/pedidos.entity"

@Injectable()
export class EstadosService {
    
    constructor(
        @InjectRepository(Pedidos) private pedidosRepository: Repository<Pedidos>
    ){}

    async getEstado(estado: string){

        // Trae solo los pedidos que tengan el estado proporcionado
        const estadoFiltro = await this.pedidosRepository.find({
            where: {
                estado: estado
            },
            relations: ['carrito', 'carrito.producto', 'carrito.usuario', 'carrito.producto.precio' ]
        }) 

        if (!estadoFiltro || estadoFiltro.length === 0) { // Verifica si esta vacia
            throw new HttpException('No se encontraron pedidos con el estado proporcionado', HttpStatus.NOT_FOUND)
        }

        return estadoFiltro
    }
}
