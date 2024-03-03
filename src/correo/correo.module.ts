import { Module } from '@nestjs/common';
import { CorreoController } from './correo.controller';
import { CorreoService } from './correo.service';

@Module({
  controllers: [CorreoController],
  providers: [CorreoService]
})
export class CorreoModule {}
