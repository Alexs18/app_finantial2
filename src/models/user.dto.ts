import { IsNumber, IsString } from "class-validator";
import {Transform} from "class-transformer"

export class USER_DTO{

    @IsString()
    readonly first_name:     string;
    @IsString()
    readonly last_name:      string;
    @IsString()
    @Transform(({value})=> value.trim())
    readonly password:       string;
    @IsNumber()
    readonly id_user_type:   string;
    @IsString()
    @Transform(({value})=> value.trim())
    readonly username:       string;
    
}

export class USER_LOGIN{

    @IsString()
    @Transform(({value})=> value.trim())
    readonly password:       string;
    @IsString()
    @Transform(({value})=> value.trim())
    readonly username:       string;
    
}