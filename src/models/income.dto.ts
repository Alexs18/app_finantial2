import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class TYPE_INCOME_DTO{
    @IsNumber()
    id_type_income:    number;
    @Transform(({value})=> value.trim())
    description:         string;
}