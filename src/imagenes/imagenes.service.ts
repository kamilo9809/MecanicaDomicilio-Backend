import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Repository } from "typeorm"
import { Imagenes } from "./imagenes.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { ImagenesDto } from './typado/crear-typado.typado';



@Injectable()
export class ImagenesService {

    constructor(
        @InjectRepository(Imagenes) private imagenesRepository: Repository<Imagenes>
        ){}

        //obtiene todas las imagenes
        getImagenes(){
            return this.imagenesRepository.find()
        }

        async crearImagen(data: ImagenesDto){
            //si ya la imagen existe no permite q se guarde
            const existeImagene = await this.imagenesRepository.findOne({
                where: {
                    url: data.url
                }
            })

            if(existeImagene){
                throw new HttpException('La imagen q intengas agragar ya la tiene otro producto', HttpStatus.NOT_FOUND)
            }

            //crea la imagen en la constante 
           const newImagen = this.imagenesRepository.create(data)
           return this.imagenesRepository.save(newImagen)//y aca la guarda 
        }

        async eliminaImagen(idImagenes: number ){
            //paso el id por parametros y utilizo un metodo de el repository
            const existeImagen = await this.imagenesRepository.delete({idImagenes})

            if (existeImagen.affected === 0) {
                throw new HttpException('La imagen q intentas eliminar no esxiste', HttpStatus.NOT_FOUND)
            }

            return existeImagen
        }

        async updateImagen(idImagenes: number, data: ImagenesDto) {
            // Buscar la imagen por su id
            const imagen = await this.imagenesRepository.findOne({
                where: {
                    idImagenes
                }
            });
       
            // Verificar si la imagen existe
            if (!imagen) {
                throw new HttpException(`La imagen que intentas actualizar no existe`, HttpStatus.NOT_FOUND);
            }
            
            // Actualizar las propiedades de la imagen con los datos del DTO
            if (data.url !== undefined) {
                imagen.url = data.url;
            }
            
            // Guardar la imagen actualizada en la base de datos
            return this.imagenesRepository.save(imagen);
        }
        
        async getImagen(idImagenes: number){
            const existeImagen = await this.imagenesRepository.findOne({
                where: {
                    idImagenes
                }
            });
       
            // Verificar si la imagen existe
            if (!existeImagen) {
                throw new HttpException(`La imagen que intentas buscar no existe no existe`, HttpStatus.NOT_FOUND);
            }

            return existeImagen
            
        }
}
