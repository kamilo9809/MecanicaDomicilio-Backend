import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { Calificaciones } from "./calificaciones.entity"
import { CalificacionesService } from "./calificaciones.service"
import { crearCalificacionesDto } from './typado/typado.calificaciones';

@Controller('calificaciones')
export class CalificacionesController {
    
    
    constructor(private calificacionesService: CalificacionesService){}

    @Get()
    getCalificaciones(){
        return this.calificacionesService.getCalificaciones()
    }

    @Post(':id') 
    crearCalificaciones(
      @Param('id', ParseIntPipe) id: number, 
      @Body() calificacion: crearCalificacionesDto // Obtener la calificación desde el cuerpo de la solicitud
    ) {
      return this.calificacionesService.crearCalificaciones(id, calificacion); // Llamar al método del servicio con el ID y la calificación
    }
    
}
