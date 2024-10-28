import { IsDecimal, IsNumber, IsString } from "class-validator";

export class MOVEMENT_DTO{
    @IsNumber()
    id_user:           number;
    @IsNumber()        
    amount:            number;
    @IsString()         
    comment_fm:        string;
    @IsNumber()
    id_type_movement:   number;
    @IsNumber()
    id_type_expenses_or_income: number;
}