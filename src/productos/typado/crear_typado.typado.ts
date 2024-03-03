export class UpdateProductoDto {
    nombre_productos?: string;
    descripcion?: string;
    garantia?: number;
    cantidad_stock?: number;
    referencia?: string;
    categoriaIdCategoria?: number;
    marcaIdMarca?: number;
    precioIdPrecio?: number;
    imagenesIdImagenes?: number;
  }
  

export class CrearProductoDto{
    nombre_productos?: string;
    decripcion?: string; // Corregir nombre de propiedad
    garantia?: number;
    cantidad_stock?: number;
    referencia?: string;
    categoriaIdCategoria?: number;
    marcaIdMarca?: number;
    precioIdPrecio?: number;
    imagenesIdImagenes?: number
}
