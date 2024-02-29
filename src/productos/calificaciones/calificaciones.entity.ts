import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from "typeorm"
import { Productos } from "../productos.entity";

@Entity()
export class Calificaciones {
    @PrimaryGeneratedColumn()
    idCalificaciones: number

    @Column({ type: 'smallint', nullable: true })
    estrellas: number | null; // Define la columna para almacenar el número de estrellas

    @Column({ type: 'varchar', length: 500 })
    reviews: string 

    //una calificacion pertenece a un producto
    @ManyToOne(()=> Productos, producto => producto.calificaciones)
    producto:Productos
}