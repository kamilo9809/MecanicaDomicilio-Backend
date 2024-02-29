import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Pedidos } from "../pedidos/pedidos.entity"; // Ajusta la ruta de importación según tu estructura de archivos

@Entity()
export class Usuarios {
    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column({ type: 'varchar', length: 100 })
    nombre_cliente: string;

    @Column({ type: 'varchar', length: 100 })
    apellido: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    empresa: string;

    @Column({ type: 'varchar', length: 100 })
    departamento: string;

    @Column({ type: 'varchar', length: 100 })
    ciudad: string;

    @Column({ type: 'varchar', length: 100 })
    direccion: string;

    @Column({ type: 'varchar', length: 100 })
    correo: string;

    @Column()
    telefono: string;

    @Column()
    fecha: Date;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    // Definiendo la relación uno a muchos con los pedidos
    @OneToMany(() => Pedidos, pedido => pedido.usuario)
    pedidos: Pedidos[];
}
