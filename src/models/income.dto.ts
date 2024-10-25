import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class TYPE_EXPENSES_DTO{
    @IsNumber()
    id_type_expenses:    number;
    @Transform(({value})=> value.trim())
    description:         string;
}