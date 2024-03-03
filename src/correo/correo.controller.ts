import { Controller, Post, Body } from '@nestjs/common';
import { CorreoService } from './correo.service';

@Controller('correo')
export class CorreoController {
  constructor(private readonly correoService: CorreoService) {}

  @Post()
  async sendEmail(@Body() body: any) {
    const { from, to, subject, text } = body;
    await this.correoService.sendEmail(from, to, subject, text); // Incluye el remitente 'from' en la llamada al método
    return { message: 'Correo electrónico enviado exitosamente' };
  }
}
