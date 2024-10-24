import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkpassword, encrytpassword } from 'src/helpers/users.helpers';
import { insertuserSql } from 'src/helpers/users.helpers.sql';
import { USER_DTO, USER_LOGIN } from 'src/models/user.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        private readonly db:DataSource,
        private readonly jwtServices:JwtService
    ){

    }

    async login(user:USER_LOGIN){

        try {
            const {password,username} = user;
            const userfound:USER_LOGIN[] = await this.db.query(`select password, user_name from app_finantial.users where user_name =  '${username}'`);
        
            const loginsuccss = await checkpassword(password.trim(), userfound[0].password.trim());
            if (!loginsuccss) {
                throw new NotFoundException('USUARIO O CONTRASEÑA NO COINCIDE POR FAVOR VERIFIQUE')
            }
            const payload = await this.jwtServices.signAsync({username:userfound[0].username});
            return {
                token:payload,
                user:userfound[0].username
            };    
        } catch (error) {
            console.log('el mistake');
            console.log(error);
            
            
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
    


}
