import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Usuarios } from "../usuarios/usuarios.entity";
import { Carrito } from "../carrito/carrito.entity"

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

  // Un pedido está asociado con un carrito
  @OneToOne(() => Carrito)
  carrito: Carrito;
}
