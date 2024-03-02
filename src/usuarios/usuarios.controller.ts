import { Controller, Body, Get, Post, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import {UsuariosService} from "../usuarios/usuarios.service"
import {Usuarios} from "../usuarios/usuarios.entity"
import { CrearUsuarioDto, actualizarUsuarioDto } from './typado/crear_user.typado';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService){}

    //optienes todos los usuarios de la base de datos
    @Get()
    getUsuarios():Promise<Usuarios[]>{//indica q va devolver un array
        return this.usuariosService.getUsuarios();
    }

    @Post()//newUsuario es la constante en la q guarda el usuario, esta constante esta en usuarios.service 
    crearUsuario(@Body() newUsuario: CrearUsuarioDto){
        return this.usuariosService.crearUsuario(newUsuario);
    }

    //paso por parametros el idUsuario y asi obtengo la informacion del cliente
    @Get(':idUsuario')
    getUserId(@Param('idUsuario', ParseIntPipe) id: number){
        return this.usuariosService.getUserId(id)
    }

    //actualiza el contenido del usuario
    @Patch(':idUsuario')
    actualizarUsuario(@Param('idUsuario', ParseIntPipe) id: number, @Body() usuario: actualizarUsuarioDto){
        return this.usuariosService.actualizarUsuario(id, usuario)
    }

    //el idUsuario q extrae del cuerpo de la petición lo asigna a la variable id
    @Delete(':idUsuario')
    eliminarUsuario(@Param('idUsuario', ParseIntPipe) id: number){
        return this.usuariosService.eliminarUsuario(id)
    }
}
