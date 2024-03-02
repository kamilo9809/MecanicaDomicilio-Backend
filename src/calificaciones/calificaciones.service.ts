import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Calificaciones } from "./calificaciones.entity"
import { Repository } from "typeorm" //esta classe permite operaciones crud
import { crearCalificacionesDto } from "./typado/typado.calificaciones"
import { Productos } from "../productos/productos.entity"
import { ProductosService } from "../productos/productos.service"



@Injectable()
export class CalificacionesService {

    
    constructor(
        @InjectRepository(Calificaciones) private calificacionesRepository: Repository<Calificaciones>,
        private productosService: ProductosService
    ) {}

    //lista todas las calificaciones
    getCalificaciones(){
        return this.calificacionesRepository.find()
    }

    
    async crearCalificaciones(idProducto: number, calificacion: crearCalificacionesDto) {
        try {
            // Verificar si el producto existe y ademas trae ese id para poner guardar la calificacion en la pinche base de datos
            const producto = await this.productosService.getProductosId(idProducto);
            if (!producto) {
                throw new HttpException('El producto no existe', HttpStatus.NOT_FOUND);
            }
    
            // Crear una nueva instancia de Calificaciones
            const nuevaCalificacion = new Calificaciones();
            nuevaCalificacion.estrellas = calificacion.estrellas;
            nuevaCalificacion.reviews = calificacion.reviews;
            nuevaCalificacion.producto = producto;
    
            // Guardar la nueva calificación en la base de datos
            return await this.calificacionesRepository.save(nuevaCalificacion);
        } catch (error) {
            throw new HttpException(`Error al crear la calificación: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}
