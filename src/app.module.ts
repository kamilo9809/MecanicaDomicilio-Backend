import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"//este modulo simplifica la conexion a la base de datos
import { ProductosModule } from './productos/productos.module';
import {Productos} from "./productos/productos.entity"
import {Categorias} from "./productos/categorias/categorias.entity"
import {Imagenes} from "./productos/imagenes/imagenes.entity"
import {Precio} from "./productos/precio/precio.entity"
import { Marca } from './productos/marca/marca.entity';
import { PedidosModule } from './pedidos/pedidos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import {Detalles_pedidos} from "./pedidos/detalles_pedido/detalles_pedido.entity"
import * as dotenv from 'dotenv';
import { Pedidos } from './pedidos/pedidos.entity';
import { Usuarios } from './usuarios/usuarios.entity';
import { Calificaciones } from './productos/calificaciones/calificaciones.entity';

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
      entities: [Productos, Categorias, Imagenes, Precio, Marca, Detalles_pedidos, Pedidos, Usuarios, Calificaciones],//dice q cualquier carpeta de la ruta con la extencion la va cargar automaticamente
      synchronize: true //creo las tablas en codigo y este lo va reflejar en la base de datos
    }),
    ProductosModule,
    PedidosModule,
    UsuariosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
