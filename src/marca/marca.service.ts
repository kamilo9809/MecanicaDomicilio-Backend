import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MarcaTypadoDto } from "./typado/typado.marcaTypado"
import { Marca } from "./marca.entity"

@Injectable()
export class MarcaService {

    constructor(@InjectRepository(Marca) private marcaRepository: Repository<Marca>){}

    // Obtener todas las marcas
    async obtenerTodasLasMarcas(): Promise<Marca[]> {
        return await this.marcaRepository.find();
    }

    // Obtener una marca por su ID
    async obtenerMarcaPorId(idMarca: number): Promise<Marca> {
        const marca = await this.marcaRepository.findOne({
            where: {
                idMarca
            }
        });
        if (!marca) {
            throw new HttpException('Marca no encontrada', HttpStatus.NOT_FOUND);
        }
        return marca;
    }

    // Crear una nueva marca
    async crearMarca(marcaDto: MarcaTypadoDto): Promise<Marca> {

        const existenteMarca = await this.marcaRepository.findOne({
            where: {
                nombre_marca: marcaDto.nombre_marca
            }
        })

        if (existenteMarca) {
           throw new HttpException('La marca q intentas ingresar ya existe', HttpStatus.CONFLICT)
        }

        const nuevaMarca = this.marcaRepository.create(marcaDto);
        return await this.marcaRepository.save(nuevaMarca);
    }

    // Actualizar una marca existente
    async actualizarMarca(idMarca: number, marcaDto: MarcaTypadoDto): Promise<Marca> {
        const marcaExistente = await this.marcaRepository.findOne({
            where: {
                idMarca
            }
        });
        if (!marcaExistente) {
            throw new HttpException('Marca no encontrada', HttpStatus.NOT_FOUND);
        }
        // Actualizar los campos de la marca con los datos del DTO
        this.marcaRepository.merge(marcaExistente, marcaDto);
        return await this.marcaRepository.save(marcaExistente);
    }

    // Eliminar una marca
    async eliminarMarca(idMarca: number) {
        const marcaExistente = await this.marcaRepository.delete({idMarca})
        
        if (marcaExistente.affected === 0) {
            throw new HttpException('Marca no encontrada', HttpStatus.NOT_FOUND);
        }
        
       return marcaExistente
    }
}
