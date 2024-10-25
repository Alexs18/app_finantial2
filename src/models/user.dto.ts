import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
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

    @IsNumber()
    @IsOptional()
    id_user:                number
    @IsString()
    @Transform(({value})=> value.trim())
    readonly password:       string;
    @IsString()
    @Transform(({value})=> value.trim())
    readonly mail:       string;
    
}

export class    RESTORE_PASSWORD{

    @IsNumber()
    readonly code:   number;
    @IsNumber()
    readonly id_user: number;    
}


export class USER_RESTORE{

    @IsString()
    @Transform(({value})=> value.trim())
    readonly sendmail:       string;
    @IsNumber()
    readonly id_user:       number;
    
}