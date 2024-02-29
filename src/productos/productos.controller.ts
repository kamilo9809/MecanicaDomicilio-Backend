import { Controller, Delete, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Productos } from './productos.entity';
import { ProductosService } from './productos.service';


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

  //elimina el producto por el id pero posiblemente no se pueda poner en practica porq hay tablas relacionadas
  // @Delete(':idProductos')
  // eliminarProducto(@Param('idProductos', ParseIntPipe) id: number){
  //   return this.productosService.eliminarProducto(id)
  // }

  
}
