import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { checkpassword, encrytpassword, generatenumberrandom } from 'src/helpers/users.helpers';
import { createrestorepassword, getuserlogin, insertuserSql, restorepassword, restrictionmailforday, validatecode } from 'src/helpers/users.helpers.sql';
import { RESTORE_PASSWORD, USER_DTO, USER_LOGIN } from 'src/models/user.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        private readonly db:DataSource,
        private readonly jwtServices:JwtService,
        private readonly appservice:AppService
    ){

    }

    async login(user:USER_LOGIN){

        try {
            const {password,mail} = user;
            const userfound:USER_LOGIN[] = await this.db.query(getuserlogin(mail));
        
            const loginsuccss = await checkpassword(password.trim(), userfound[0].password.trim());
            if (!loginsuccss) {
                return {HttpStatus:HttpStatus.UNAUTHORIZED, message:'USUARIO O CONTRASEÑA INCORRECTO, INTENTE NUEVAMENTE'}
            }
            const payload = await this.jwtServices.signAsync({username:userfound[0].mail});
            return {
                token:payload,
                user:userfound[0].mail
            };    
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException('Error al momento de ingresar')
            
        }
        
    }
    async restorepassword(sendmail:string){

       const userfound:USER_LOGIN[] = await this.db.query(getuserlogin(sendmail));
       if (!userfound) {
            return {HttpStatus:HttpStatus.NO_CONTENT, message:'USUARIO NO REGISTRADO CON DICHO CORREO, IMPOSIBLE CONTINUAR'}
       }
       const restrictionmailfordaydata = await this.db.query(restrictionmailforday(userfound[0].id_user));
       if (restrictionmailfordaydata[0].attempts >= process.env.ATTEMPS_MAIL) {
            return {HttpStatus:HttpStatus.UNAUTHORIZED, message:'lo sentimos ha exedido el numero de intentos por hoy para restablecer contraseña, prueba nuevamente mañana'}
       }
       const ramdomnuber = generatenumberrandom();
       const textmail = `CODIGO PARA RECUPERACION DE CONTRASEÑA ${ramdomnuber} RECUERDA QUE ESTE CODIGO TIENE VALIDES DE 5 MINUTOS`
       const subject = 'RECUPERACION DE CONTRASEÑA'
       const mailsend = await this.appservice.sendMail(sendmail,textmail, subject);
    
       if (mailsend.HttpStatus != 202) {
         return {message:'Ocurrio un error al tratar de recuperar la contraseña'}
       }

       const restoreregisterd = await this.registercoderestore({id_user:userfound[0].id_user, code:ramdomnuber});
       
       return {mail:mailsend.data, data:restoreregisterd, HttpStatus:HttpStatus.ACCEPTED}
        
        
    }

    private async registercoderestore(restorepassword:RESTORE_PASSWORD){
        
        try {
            
            const resgisterrestore:{id:number, code:number}[] = await this.db.query(createrestorepassword(restorepassword));
            return resgisterrestore[0]

        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException('OCURRIO UN ERROR AL TRATAR DE GENERAR EL CODIGO PARA RECUPERACION DE USUARIO')
        }

    }

    async validatecoderestorepassword(mail:string, code:number){
        const user:USER_LOGIN[] = await  this.db.query(getuserlogin(mail));
        const statuscode:{validated:boolean}[] = await  this.db.query(validatecode(code, user[0].id_user));
         
        if(!statuscode[0].validated){
            throw new UnauthorizedException(`Ups lo sentimos al parecer el codigo ${code} se encuentra expirado o no existe, intenta nuevamente`)
        }
        return {HttpStatus:HttpStatus.ACCEPTED, message:'codigo valido', data:{code:code, status:statuscode[0].validated}} 

    }
    async changepassword(mail:string,password:string, optional?:boolean){
        const textmail = optional== true? 'RESTABLECIMIENTO DE CONTRASEÑA AUTOMATICA':'CAMBIO DE CONTRASEÑA'; 
        try {
            const newpassword = await encrytpassword(password);
            const updatedpassword = await this.db.query(restorepassword(mail, newpassword));
            if (!updatedpassword) {
                throw new NotFoundException('Al parecer no se logró cambiar la contraseña, verifique el usuario e intente nuevamente')
            }
            await this.appservice.sendMail(mail, `CONTRASEÑA NUEVA ${password}`,textmail)
            return {HttpStatus:HttpStatus.ACCEPTED, message:'contraseña actualizada correctamente', data:updatedpassword[0]}     
        } catch (error) {
            console.log('error');
            console.log(error);
            throw new InternalServerErrorException('Error al intentar cambiar de contraseña')
            
        }   
       

    }

    async createuser(data:USER_DTO){


        try {
            const newpassword = await encrytpassword(data.password);
            const usercreated = await this.db.query(insertuserSql(data, newpassword));
            return {status: HttpStatus.ACCEPTED, message:'user created success', usercreated};    
        
        } catch (error) {

            throw new InternalServerErrorException(`Ocurrio un error en el servidor ${error.code}`)    
        }
        

    }
    
    async generatepassword(mail:string){
        const newpassword = generatenumberrandom() + '_finantial';
        return await this.changepassword(mail, newpassword, true);
    }


}
