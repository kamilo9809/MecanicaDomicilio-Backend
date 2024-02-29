import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { Productos } from "../productos.entity"

@Entity()
export class Precio{

    @PrimaryGeneratedColumn()
    idPrecio: number

    @Column()
    Precio: number

    //relacion muchos a uno donde un producto esta asociado a un precio
    @ManyToOne(()=> Productos, productos => productos.precio)
    productos: Productos
}