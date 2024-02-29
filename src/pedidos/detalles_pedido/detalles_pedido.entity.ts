import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { Pedidos } from "../pedidos.entity"

@Entity()
export class Detalles_pedidos{

    @PrimaryGeneratedColumn()
    idDetallePedido: number

    @Column()
    cantidadPedido: number

    @ManyToOne(()=> Pedidos, pedido => pedido.detalle)
    pedido: Pedidos
}