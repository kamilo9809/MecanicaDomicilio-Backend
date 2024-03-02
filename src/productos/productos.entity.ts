import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Categorias } from "../categorias/categorias.entity"
import { Imagenes } from "./imagenes/imagenes.entity"
import { Precio } from "./precio/precio.entity"
import { Marca } from "./marca/marca.entity"
import { Calificaciones } from "../calificaciones/calificaciones.entity"



@Entity()
export class Productos {

    @PrimaryGeneratedColumn()//genera ei id automatico
    idProductos: number

    @Column({ type: 'varchar', length: 100 })
    nombre_productos: string

    @Column({ type: 'varchar', length: 1000 })
    descripcion: string

    @Column({ type: 'varchar', length: 100 })
    referencia: string

    @Column('integer')//indica q el tipo de datos puede ser dias, meses o años
    garantia: number;

    @Column()
    cantidad_stock: number

    // Definimos la relación muchos a uno con la entidad Categoria pero cada producto pertenece a una categoria
    @ManyToOne(() => Categorias, categoria => categoria.productos, {cascade: true})
    categoria: Categorias;

    //un producto puede tener muchas imagenes pero una imagen solo puede estar relacionada a un producto
    // Ejemplo de la relación OneToMany con eliminación en cascada
    @ManyToOne(() => Imagenes, imagen => imagen.producto, { cascade: true })
    imagenes: Imagenes;

    //relacion uno a muchos por q el precio del producto puede cambiar con el tiempo 
    @ManyToOne(() => Precio, precio => precio.productos)
    precio: Precio;

    // Relación "muchos a uno" con la entidad Marca
    @ManyToOne(() => Marca, marca => marca.productos)
    marca: Marca;

    //un producto puede tener varias calificaciones
    @OneToMany(() => Calificaciones, calificacion => calificacion.producto, { cascade: true })
    calificaciones: Calificaciones[]
  nuevoProducto: Marca
}