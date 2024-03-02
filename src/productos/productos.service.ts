import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from './productos.entity';
import { Calificaciones } from "../calificaciones/calificaciones.entity"
import { Categorias } from "../categorias/categorias.entity"
import { Imagenes } from "./imagenes/imagenes.entity"
import { Marca } from "./marca/marca.entity"
import { Precio } from "./precio/precio.entity"
import { CrearProductoDto, UpdateProductoDto } from './typado/crear_typado.typado';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Productos)
    private readonly producRepository: Repository<Productos>,
    @InjectRepository(Precio)
    private readonly precioRepository: Repository<Precio>,
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
    @InjectRepository(Calificaciones)
    private readonly calificacionesRepository: Repository<Calificaciones>,
    @InjectRepository(Categorias)
    private readonly categoriasRepository: Repository<Categorias>,
    @InjectRepository(Imagenes)
    private readonly imagenesRepository: Repository<Imagenes>
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

    // Crea un nuevo producto
    async crearProductos(data: CrearProductoDto){
      // Verificar si el producto ya existe en la base de datos
      const existeProducto = await this.producRepository.findOne({
        where:{
          nombre_productos: data.nombre_productos
        }
      });
    
      // Si el producto ya existe, lanzar una excepción de conflicto
      if(existeProducto){
        throw new HttpException('El producto que intentas ingresar ya existe', HttpStatus.CONFLICT);
      }
    
      // Crear un nuevo objeto de producto con los datos recibidos
      const nuevoProducto = this.producRepository.create(data);
    
      // Establecer las relaciones con las otras entidades
      // Buscar la categoría asociada al ID proporcionado en los datos recibidos
      nuevoProducto.categoria = await this.categoriasRepository.findOne({ where: { idCategoria: data.categoriaIdCategoria } });
    
      // Buscar la marca asociada al ID proporcionado en los datos recibidos
      nuevoProducto.marca = await this.marcaRepository.findOne({ where: { idMarca: data.marcaIdMarca } });
    
      // Buscar el precio asociado al ID proporcionado en los datos recibidos
      nuevoProducto.precio = await this.precioRepository.findOne({ where: { idPrecio: data.precioIdPrecio } });
    
      // Buscar las imágenes asociadas al ID proporcionado en los datos recibidos
      nuevoProducto.imagenes = await this.imagenesRepository.findOne({ where: { idImagenes: data.imagenesIdImagenes } });
    
      // Guardar el nuevo producto en la base de datos
      return await this.producRepository.save(nuevoProducto);
    }
    
    
//elimina el producto por el id pero posiblemente no se pueda poner en practica porq hay tablas relacionadas
  async eliminarProducto(idProductos: number){
    const existeProducto = await this.producRepository.delete({idProductos})

    if (existeProducto.affected === 0) {
      throw new HttpException('El producto que intentas eliminar no existe', HttpStatus.NOT_FOUND)
    }

    return existeProducto
  }


}

