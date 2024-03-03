import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import {Productos} from "../productos/productos.entity"

@Entity()
export class Imagenes {
    @PrimaryGeneratedColumn()//genera ei id automatico
    idImagenes: number

    @Column({ type: 'varchar', length: 200 })
    url: string

    //un producto puede tener muchas imagenes pero una imagen pertenece a un producto relacion uno a muchos
    @OneToMany(() => Productos, producto => producto.imagenes)
    producto: Productos;
    
}
