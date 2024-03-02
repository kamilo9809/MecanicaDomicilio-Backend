import { Injectable, HttpException, HttpStatus, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { Repository } from "typeorm"//esta classe permite operaciones crud
import { InjectRepository } from "@nestjs/typeorm"
import { Usuarios } from "../usuarios/usuarios.entity"
import { CrearUsuarioDto, actualizarUsuarioDto } from './typado/crear_user.typado';

@Injectable()
export class UsuariosService {
    constructor (
        @InjectRepository(Usuarios) private usuariosRepository: Repository<Usuarios>
    ){ }

    //este metodo optiene todos los usuarios
    getUsuarios(){
        return this.usuariosRepository.find()
    }

    async crearUsuario(usuario: CrearUsuarioDto){
        const usuarioExiste = await this.usuariosRepository.findOne({
            where: {
                correo: usuario.correo//busca si el correo ya existe 
            }
        })
        
        if(usuarioExiste){
            //este es el mensaje de error si el correo q ingreso el usuario ya existe
            throw new HttpException('El correo ya esta registrado', HttpStatus.CONFLICT);
        }

        //si el correo no existe permite q se guarde el registro
        const newUsuario = this.usuariosRepository.create(usuario)
        return this.usuariosRepository.save(newUsuario)
    }

    //obtengo el usuario por el idUsuario 
    async getUserId(idUsuario: number){//especifico el tipo de dato q voy a pasar
        const usuarioExiste = await this.usuariosRepository.findOne({
            where:{
                idUsuario
            }
        })

        if (!usuarioExiste) {
            throw new HttpException('El usuario q buscas no existe', HttpStatus.NOT_FOUND)
        }

        return usuarioExiste
    }


    async actualizarUsuario(idUsuario: number, usuario: actualizarUsuarioDto) {
        // Validar la existencia del usuario
        const usuarioExiste = await this.usuariosRepository.findOne({
            where:{
                idUsuario
            }
        });
        if (!usuarioExiste) {
            throw new HttpException('El usuario que intentas actualizar no existe', HttpStatus.NOT_FOUND);
        }
       
       // es un método en JavaScript que se utiliza para copiar los valores de todas las propiedades enumerables de uno o más objetos fuente (origen) a un objeto destino. Devuelve el objeto destino modificado.
        Object.assign(usuarioExiste, usuario);
    
        try {
            // Guardar los cambios en la base de datos dentro de una transacción
            const usuarioActualizado = await this.usuariosRepository.save(usuarioExiste);
            return usuarioActualizado;
        } catch (error) {
            // Manejar cualquier error que ocurra durante la actualización
            throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminarUsuario(idUsuario: number){
        const usuarioExiste = await this.usuariosRepository.delete({idUsuario})

        if (usuarioExiste.affected === 0) {
            throw new HttpException('El usuario q intentas eliminar no existe', HttpStatus.NOT_FOUND)
        }

        return usuarioExiste
    }
}


