
import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ConsultasFechasService } from './consultas-fechas.service';
import { Pedidos } from '../pedidos/pedidos.entity';

@Controller('consultas-fechas')
export class ConsultasFechasController {
  constructor(private readonly consultasFechasService: ConsultasFechasService) {}

  @Get('fecha/:fecha')
  async buscarPedidosPorFecha(@Param('fecha') fechaStr: string): Promise<Pedidos[]> {
    // Dividir la cadena en base al carácter "T" y tomar la primera parte (la fecha)
    const fechaSinHora = fechaStr.split('T')[0];
    
    const fecha = new Date(fechaSinHora);
    console.log(fechaSinHora);
    
    if (isNaN(fecha.getTime())) {
      throw new BadRequestException('Fecha inválida');
    }
    
    return await this.consultasFechasService.findPedidosPorFecha(fecha); // Pasa el objeto Date
  }
  

  @Get('rango/:fechaInicio/:fechaFin')
  async buscarPedidosPorRangoDeFechas(
    @Param('fechaInicio') fechaInicioStr: string,
    @Param('fechaFin') fechaFinStr: string,
  ): Promise<Pedidos[]> {
    const fechaInicio = new Date(fechaInicioStr);
    const fechaFin = new Date(fechaFinStr);
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      throw new BadRequestException('Fechas inválidas');
    }
    return await this.consultasFechasService.findPedidosPorRangoDeFechas(fechaInicio, fechaFin); // Pasa los objetos Date
  }
}
