import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {Productos} from "../productos.entity"

@Entity()
export class Imagenes {
    @PrimaryGeneratedColumn()//genera ei id automatico
    idImagenes: number

    @Column({ type: 'varchar', length: 200 })
    url: string

    //un producto puede tener muchas imagenes pero una imagen pertenece a un producto relacion uno a muchos
    @ManyToOne(() => Productos, producto => producto.imagenes)
    producto: Productos;
    
}
