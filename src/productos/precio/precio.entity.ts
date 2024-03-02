import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import { Productos } from "../productos.entity"
import * as bigInt from 'big-integer'; // Importa la biblioteca big-integer

@Entity()
export class Precio{

    @PrimaryGeneratedColumn()
    idPrecio: number

    @Column('bigint') // Utiliza 'bigint' en lugar de 'number' para manejar números grandes
    precio: bigInt.BigInteger;

    //relacion muchos a uno donde un producto esta asociado a un precio
    @OneToMany(()=> Productos, productos => productos.precio)
    productos: Productos[]
}