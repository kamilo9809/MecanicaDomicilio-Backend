import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"//este modulo simplifica la conexion a la base de datos
import { ProductosModule } from './productos/productos.module';
import {Productos} from "./productos/productos.entity"
import { Categorias } from "./categorias/categorias.entity"
import {Imagenes} from "./imagenes/imagenes.entity"
import {Precio} from "./precio/precio.entity"
import { Marca } from './marca/marca.entity';
import { PedidosModule } from './pedidos/pedidos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import * as dotenv from 'dotenv';
import { Pedidos } from './pedidos/pedidos.entity';
import { Usuarios } from './usuarios/usuarios.entity';
import { Calificaciones } from './calificaciones/calificaciones.entity';
import { BuscadorModule } from './buscador/buscador.module';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ImagenesModule } from './imagenes/imagenes.module';
import { MarcaModule } from './marca/marca.module';
import { PrecioModule } from './precio/precio.module';
import { CorreoModule } from './correo/correo.module';
import { CarritoModule } from './carrito/carrito.module';
import { Carrito } from "./carrito/carrito.entity"
import { MapaModule } from './mapa/mapa.module';
import { ConsultasFechasModule } from './consultas-fechas/consultas-fechas.module';


dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite', // Asegurarse de que el tipo sea uno de los tipos válidos
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Productos, Categorias, Imagenes, Precio, Marca, Pedidos, Usuarios, Calificaciones, Carrito],//dice q cualquier carpeta de la ruta con la extencion la va cargar automaticamente
      synchronize: true //creo las tablas en codigo y este lo va reflejar en la base de datos
    }),
    ProductosModule,
    PedidosModule,
    UsuariosModule,
    BuscadorModule,
    CalificacionesModule,
    CategoriasModule,
    ImagenesModule,
    MarcaModule,
    PrecioModule,
    CorreoModule,
    CarritoModule,
    MapaModule,
    ConsultasFechasModule


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
