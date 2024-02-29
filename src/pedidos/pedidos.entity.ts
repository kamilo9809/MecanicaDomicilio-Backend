import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Usuarios } from "../usuarios/usuarios.entity";
import {Detalles_pedidos} from "../pedidos/detalles_pedido/detalles_pedido.entity"

@Entity()
export class Pedidos {
    @PrimaryGeneratedColumn()
    idPedido: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @Column()
    estado: boolean;

    // un pedido pertenece aun usuario
    @ManyToOne(() => Usuarios, usuario => usuario.pedidos)
    usuario: Usuarios;

    @OneToMany(() => Detalles_pedidos, detalle => detalle.pedido) // Cambio aquí
    detalle: Detalles_pedidos[]; // Cambio aquí
}
