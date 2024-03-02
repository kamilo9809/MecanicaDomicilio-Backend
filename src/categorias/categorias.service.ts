import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Categorias } from "./categorias.entity"
import { CrearCategoriaDto, UpdateCategoriaDto } from "./typado/typado.categoria"

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categorias) private categoriaRepository: Repository<Categorias>
    ){}

    //lista todas las categorias
    getCategorias(){
        return this.categoriaRepository.find()
    }

  //obtiene una categoria en especial
   async getCategoriaId(idCategoria: number ){
        const existeCategoria = await this.categoriaRepository.findOne({
            where:{
                idCategoria
            }
        })

        if(!existeCategoria){
            throw new HttpException('La categoria no existe', HttpStatus.NOT_FOUND)
        }

        return existeCategoria
    }

    //actualizar la categoria
   async updateCategoria(idCategoria: number, data: UpdateCategoriaDto){
    const existeCategoria = await this.categoriaRepository.findOne({
        where:{
            idCategoria
        }
    })

    if(!existeCategoria){
        throw new HttpException('La categoria seleccionada no existe', HttpStatus.NOT_FOUND)
    }

    const updateCategoria = Object.assign(existeCategoria, data)
    return this.categoriaRepository.save(updateCategoria)
   }

   //crea una categoria y verifica q no exista una categoria igual a la q se intenta ingresa
   async crearCategoria(data: CrearCategoriaDto){
    const existeCategoria = await this.categoriaRepository.findOne({
        where: {
            nombre_categoria: data.nombre_categoria
        }
    })

    if (existeCategoria) {
        throw new HttpException('La categoria q intentas ingresar ya existe', HttpStatus.NOT_FOUND)
    }

    const newCategoria = await this.categoriaRepository.create(data)
    return this.categoriaRepository.save(newCategoria)
   }

   //elimina las categorias por id
   async eliminarCategoria(idCategoria: number){
    const existeCategoria = await this.categoriaRepository.delete({idCategoria})

    if (existeCategoria.affected === 0) {
        throw new HttpException('La categoria no existe', HttpStatus.NOT_FOUND)
    }

    return existeCategoria
   }
}
