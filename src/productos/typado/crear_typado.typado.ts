export class UpdateProductoDto{
    nombre_productos?: string;
    decripcion?: string; // Corregir nombre de propiedad
    garantia?: number;
    cantidad_stock?: number;
    referencia?: string;
    categoriaIdCategoria?: number;
    marcaIdMarca?: number;
    precioIdPrecio?: number;
}
