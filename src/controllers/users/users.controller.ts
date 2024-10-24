import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { USER_DTO, USER_LOGIN } from 'src/models/user.dto';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')

export class UsersController {

    constructor(
        private readonly UserServices:UsersService
    ){

    }

    @Post('/login')
    login(
        @Body() user:USER_LOGIN
    ){
        return this.UserServices.login(user);
    }
    @Post('/create')
    createuser(
        @Body() userregisterd:USER_DTO
    ){
        return this.UserServices.createuser(userregisterd)
    }
    @Get('/allusers')
    @UseGuards(AuthGuard)
    getusers(){
        return 'holaaa'
    }
    @Put('/updateuser')
    updateuser(){

    }
    @Delete('/deleteuser')
    deleteuser(){

    }

}
