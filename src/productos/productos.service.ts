import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from './productos.entity';
import { Calificaciones } from "../calificaciones/calificaciones.entity"
import { Categorias } from "../categorias/categorias.entity"
import { Imagenes } from "./imagenes/imagenes.entity"
import { Marca } from "./marca/marca.entity"
import { Precio } from "./precio/precio.entity"
import { UpdateProductoDto } from './typado/crear_typado.typado';

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
    async crearProducto(productoData: Partial<Productos>, marcaId: number, categoriaId: number, precioid: number): Promise<Productos> {
      try {
        const precio = await this.precioRepository.findOne({where:{idPrecio: precioid}});
        if (!precio) {
          throw new Error('El precio no existe');
        }

        const categoria = await this.categoriasRepository.findOne({where:{idCategoria: categoriaId}});
        if (!categoria) {
          throw new Error('La categoria especificada no existe');
        }
        // Buscar la marca por su ID
        const marca = await this.marcaRepository.findOne({where:{idMarca: marcaId}});
        if (!marca) {
          throw new Error('La marca especificada no existe');
        }
  
        // Asignar la marca al producto
        const nuevoProducto = this.producRepository.create({
          ...productoData,
          marca: marca,
          categoria: categoria,
          precio: precio
        });
  
        // Guardar el nuevo producto en la base de datos
        return await this.producRepository.save(nuevoProducto);
      } catch (error) {
        throw new Error(`Error al crear el producto: ${error.message}`);
      }
    }
    
    async updateProducto(idProductos: number, data: UpdateProductoDto): Promise<Productos> {
      // Busca el producto por su ID
      const producto = await this.producRepository.findOne({
        where: {
          idProductos
        }
      });

  
      if (!producto) {
        throw new HttpException('El producto no existe', HttpStatus.NOT_FOUND);
      }
  
      // Actualiza los campos del producto con los datos proporcionados en el DTO
      producto.nombre_productos = data.nombre_productos ?? producto.nombre_productos;
      producto.decripcion = data.decripcion ?? producto.decripcion;
      producto.referencia = data.referencia ?? producto.referencia;
      producto.garantia = data.garantia ?? producto.garantia;
      producto.cantidad_stock = data.cantidad_stock ?? producto.cantidad_stock;
   
  
      // Si se proporciona el ID de la categoría en el DTO, actualiza la relación de la categoría
      if (data.precioIdPrecio) {
        const precio = await this.precioRepository.findOne({
          where: {
            idPrecio: data.precioIdPrecio // Corregir aquí
          }
        });
        if (!precio) {
          throw new HttpException('El precio no existe', HttpStatus.NOT_FOUND);
        }
        producto.precio = precio;
      }
      
      // Guarda el producto actualizado en la base de datos
      return await this.producRepository.save(producto);
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

