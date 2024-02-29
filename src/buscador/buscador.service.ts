import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Productos } from '../productos/productos.entity';

@Injectable()
export class BuscadorService {

  constructor(
    @InjectRepository(Productos)
    private readonly producRepository: Repository<Productos>,
  ) { }

  //buscador de cualquier coincidencia con cualquier palabra q ingrese
  async buscarProductosPorNombre(nombre_productos: string) {
    const productos = await this.producRepository.find({
      where: {
        nombre_productos: Like(`%${nombre_productos}%`), // Utiliza Like con % busca una coincidencia del inicio hasta el final
      },
      relations: ['categoria', 'imagenes', 'precio', 'marca', 'calificaciones'],
    });

    if (!productos || productos.length === 0) {
      throw new HttpException('No se encontraron productos', HttpStatus.NOT_FOUND);
    }

    return productos;
  }
}

