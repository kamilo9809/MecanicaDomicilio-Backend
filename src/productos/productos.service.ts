import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from './productos.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly producRepository: Repository<Productos>,
  ) {}

  //consulta la informacion de todas las tablas relacionadas con productos
  async getProductos(): Promise<Productos[]> {
    return this.producRepository.find({
      relations: ['categoria', 'imagenes', 'precio', 'marca', 'calificaciones'],
    });
  }

//obtiene el producto por id
 async getProductosId(idProductos: number){
    const existeProducto = await this.producRepository.findOne({
      where: {
        idProductos
      },
      //consulta la informacion de todas las tablas relacionadas con productos
      relations: ['categoria', 'imagenes', 'precio', 'marca', 'calificaciones'],
    });

    if (!existeProducto) {
      throw new HttpException('El producto no existe', HttpStatus.NOT_FOUND)
    }

    return existeProducto
  }

//elimina el producto por el id pero posiblemente no se pueda poner en practica porq hay tablas relacionadas
  // async eliminarProducto(idProductos: number){
  //   const existeProducto = await this.producRepository.delete({idProductos})

  //   if (existeProducto.affected === 0) {
  //     throw new HttpException('El producto que intentas eliminar no existe', HttpStatus.NOT_FOUND)
  //   }

  //   return existeProducto
  // }


}

