import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";
import { Carrito } from "../carrito/carrito.entity"

@Entity()
export class Pedidos {
  @PrimaryGeneratedColumn()
  idPedido: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  estado: string;

  // Un pedido está asociado con un carrito
  @ManyToOne(() => Carrito)
  carrito: Carrito;
}
