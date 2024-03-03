import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PrecioTypadDto } from "./typado/typado.typado.precio";
import { Precio } from "./precio.entity";

@Injectable()
export class PrecioService {

    constructor(@InjectRepository(Precio) private precioRepository: Repository<Precio>){}

    // Obtener todos los precios
    async obtenerTodosLosPrecios(): Promise<Precio[]> {
        return await this.precioRepository.find();
    }

    // Obtener un precio por su ID
    async obtenerPrecioPorId(idPrecio: number): Promise<Precio> {
        const precio = await this.precioRepository.findOne({
            where: {idPrecio}
        });
        if (!precio) {
            throw new HttpException('Precio no encontrado', HttpStatus.NOT_FOUND);
        }
        return precio;
    }

    // Crear un nuevo precio
    async crearPrecio(precioDto: PrecioTypadDto): Promise<Precio> {
        const nuevoPrecio = this.precioRepository.create(precioDto);
        return await this.precioRepository.save(nuevoPrecio);
    }

    // Actualizar un precio existente
    async actualizarPrecio(idPrecio: number, precioDto: PrecioTypadDto): Promise<Precio> {
        const precioExistente = await this.precioRepository.findOne({
            where: {idPrecio}
        });
        if (!precioExistente) {
            throw new HttpException('Precio no encontrado', HttpStatus.NOT_FOUND);
        }
        this.precioRepository.merge(precioExistente, precioDto);
        return await this.precioRepository.save(precioExistente);
    }

    // Eliminar un precio
    async eliminarPrecio(idPrecio: number){
        const precioExistente = await this.precioRepository.delete({idPrecio})

        if (precioExistente.affected === 0) {
            throw new HttpException('Precio no encontrado', HttpStatus.NOT_FOUND);
        }
        
        return precioExistente
    }
}
