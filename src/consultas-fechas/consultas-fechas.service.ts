import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Pedidos } from '../pedidos/pedidos.entity';

@Injectable()
export class ConsultasFechasService {
  constructor(
    @InjectRepository(Pedidos)
    private readonly pedidoRepository: Repository<Pedidos>,
  ) {}

  async findPedidosPorFecha(fecha: Date) {
    // Obtener solo la parte de la fecha sin la hora
    const fechaSinHora = new Date(fecha);
    fechaSinHora.setHours(0, 0, 0, 0);

    const fechaInicio = new Date(fechaSinHora);
    const fechaFin = new Date(fechaSinHora);
    fechaFin.setHours(23, 59, 59, 999);

    const pedidos = await this.pedidoRepository.find({
      where: {
        fecha: Between(fechaInicio, fechaFin),
      },
      //pues esto saca toda la informacion de el producto 
      relations: ['carrito', 'carrito.producto', 'carrito.usuario', 'carrito.producto.precio' ]
    });

    if (pedidos.length === 0) {
      throw new NotFoundException('No se encontraron pedidos para la fecha especificada');
    }

    return pedidos;
  }

  async findPedidosPorRangoDeFechas(fechaInicio: Date, fechaFin: Date) {
    const pedidos = await this.pedidoRepository.find({
      where: {
        fecha: Between(fechaInicio, fechaFin),
      }
    });

    if (pedidos.length === 0) {
      throw new NotFoundException('No se encontraron pedidos en el rango de fechas especificado');
    }

    return pedidos;
  }
}
