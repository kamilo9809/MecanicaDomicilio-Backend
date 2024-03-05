import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Usuarios } from "../usuarios/usuarios.entity";
import { Productos } from "../productos/productos.entity";

@Entity()
export class Carrito {
    @PrimaryGeneratedColumn()
    id_Carrito: number;

    @Column({ type: 'integer' })
    cantidad: number;

    @ManyToOne(() => Productos, producto => producto.carritos)
    producto: Productos;

    @ManyToOne(() => Usuarios, usuario => usuario.carritos)
    usuario: Usuarios;
}
