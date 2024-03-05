
import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ConsultasFechasService } from './consultas-fechas.service';
import { Pedidos } from '../pedidos/pedidos.entity';

@Controller('consultas-fechas')
export class ConsultasFechasController {
  constructor(private readonly consultasFechasService: ConsultasFechasService) {}


  @Get('fecha/:fecha')
  async buscarPedidosPorFecha(@Param('fecha') fechaStr: string): Promise<Pedidos[]> {
    const fecha = new Date(`${fechaStr} 00:00:00`); // Agrega la hora al formato de fecha por q solo fecha no me fuciono
    console.log('Fecha recibida:', fecha);
    
    if (isNaN(fecha.getTime())) {
      throw new BadRequestException('Fecha inválida');
    }
    
    return await this.consultasFechasService.findPedidosPorFecha(fecha); // Pasa el objeto Date
  }
  


  @Get('fecha/:fechaInicio/:fechaFin')
  async buscarPedidosPorRangoDeFechas(
    @Param('fechaInicio') fechaInicioStr: string,
    @Param('fechaFin') fechaFinStr: string,
  ): Promise<Pedidos[]> {
    const fechaInicio = new Date(`${fechaInicioStr} 00:00:00`);
    const fechaFin = new Date(`${fechaFinStr} 23:59:59`);
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      throw new BadRequestException('Fechas inválidas');
    }
    return await this.consultasFechasService.findPedidosPorRangoDeFechas(fechaInicio, fechaFin);
  }
}
