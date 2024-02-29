import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { Productos } from '../productos.entity';




@Entity()
export class Categorias{

    @PrimaryGeneratedColumn()//genera ei id automatico
    idCategoria: number

    @Column({ type: 'varchar', length: 100 })
    nombre_categoria: string

   // Definimos la relación uno a muchos con la entidad Producto
    @OneToMany(() => Productos, productos => productos.categoria)
    productos: Productos[];//indica q al llamar a productos [] tendra un array  de objetos
}
