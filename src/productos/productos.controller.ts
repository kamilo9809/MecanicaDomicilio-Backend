import { Controller, Delete, Get, Param, ParseIntPipe, Query, Post, Body, Patch } from '@nestjs/common';
import { Productos } from './productos.entity';
import { ProductosService } from './productos.service';
import { UpdateProductoDto } from './typado/crear_typado.typado';


@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  //obtiene todos los productos
  @Get()
  async getProductos(): Promise<Productos[]> {
    return this.productosService.getProductos();
  }

  //obtiene los productos por el id
  @Get(':idProductos')
  getProductosId(@Param('idProductos', ParseIntPipe) id: number){
    return this.productosService.getProductosId(id)
  }

  //crea el producto
  @Post()
  async crearProducto(@Body() data: UpdateProductoDto){
    return this.productosService.crearProductos(data)
  }
  
  // //actualiza el producto
  @Patch(':idProductos')
  updateProducto(@Param('idProductos', ParseIntPipe) id: number, @Body() data: UpdateProductoDto) {
    return this.productosService.actualizarProducto(id, data);
  }
  

  //elimina el producto por el id pero posiblemente no se pueda poner en practica porq hay tablas relacionadas
  @Delete(':idProductos')
  eliminarProducto(@Param('idProductos', ParseIntPipe) id: number){
    return this.productosService.eliminarProducto(id)
  }

  
}
