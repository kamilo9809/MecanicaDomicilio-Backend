import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';


dotenv.config()


@Injectable()
export class CorreoService {
  async sendEmail(from: string, to: string, subject: string, text: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'alzatejuan1980@gmail.com', // Cambia 'tu_correo@gmail.com' por tu dirección de correo electrónico de Gmail
          pass: 'bowykoxotrqkeoev', // Cambia 'tu_contraseña' por la contraseña de tu cuenta de Gmail
        },
      });

      const mailOptions = {
        from, // Usa el remitente especificado por el usuario
        to,
        subject,
        text,
      };

      await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw new Error('Error al enviar el correo electrónico');
    }
  }
}
