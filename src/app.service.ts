import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(private readonly mailerService:MailerService){}

  getHello(): string {
    return 'Hello World!';
  }
  async sendMail(sendmail:string, text:string, subject:string){
    try {
      
      const mail = await this.mailerService.sendMail({
          from:'appfinantial@gmail.com',
          to:`${sendmail}`,
          subject,
          text
      });
      return {HttpStatus:HttpStatus.ACCEPTED, data:mail.messageId}

  } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException('OCURRIO UN ERROR AL ENVIAR EL EMAIL DE RECUÉRACION')
      
  }
  }
}
