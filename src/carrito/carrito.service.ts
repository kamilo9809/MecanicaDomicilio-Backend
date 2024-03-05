import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Carrito } from './carrito.entity';
import { CantidadDto, CrearItemDto } from './typado/typado.cantidad';

@Injectable()
export class CarritoService {
    constructor(@InjectRepository(Carrito) private carritoRepository: Repository<Carrito>){}

    async getCarrito(): Promise<Carrito[]> {
        return this.carritoRepository.find({
            relations: ['usuario', 'producto', 'producto.marca', 'producto.categoria', 'producto.imagenes', 'producto.calificaciones', 'producto.precio']
        });
    }

    async eliminarItenm(id_Carrito: number){
        const existeItem =  await this.carritoRepository.delete({id_Carrito})

        if(existeItem.affected === 0){
            throw new HttpException('El item q intentas eliminar no existe', HttpStatus.NOT_FOUND)
        }

        return existeItem
    }

    async updateCantidad(id_Carrito: number, data: CantidadDto): Promise<Carrito> {
        const existeItem = await this.carritoRepository.findOne({
            where: {
                id_Carrito
            }
        });

        if (!existeItem) {
            throw new HttpException('El item del carrito que intentas actualizar no existe', HttpStatus.NOT_FOUND);
        }

        existeItem.cantidad = data.cantidad; // Actualiza la cantidad del artículo en el carrito

        return this.carritoRepository.save(existeItem);
    }

    async crearItem(data: CrearItemDto){
        if (data.cantidad === 0) {
            throw new HttpException('Tienes que especificar una catidad', HttpStatus.NOT_FOUND)
        }
    

        const newItem = await this.carritoRepository.create(data)
        return this.carritoRepository.save(newItem)

    }

}

