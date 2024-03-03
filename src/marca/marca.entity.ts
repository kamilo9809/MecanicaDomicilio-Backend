import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Productos} from "../productos/productos.entity"

@Entity()
export class Marca {
    @PrimaryGeneratedColumn()
    idMarca: number 

    @Column({ type: 'varchar', length: 100 })
    nombre_marca: string

    // Relación "uno a muchos" con la entidad Producto
    @OneToMany(() => Productos, producto => producto.marca)
    productos: Productos[];
}