import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController } from 'src/controllers/users/users.controller';
import { UsersService } from 'src/services/users/users.service';

@Module({
    imports:[
        ConfigModule,
        JwtModule.registerAsync({
            useFactory:async()=>({
              secret:process.env.SECRET_KEY,
              signOptions:{
                expiresIn:process.env.SECRET_EXPERATION
              }
            }),
          })
    ],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule {}
