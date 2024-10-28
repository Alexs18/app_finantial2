import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { getIncomeType } from 'src/helpers/income.helpers.sql';
import { TYPE_INCOME_DTO } from 'src/models/income.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class IncomeService {

    constructor(private readonly _db:DataSource){}
    async getTypeIncome(){
        try {
            const type_expenses:TYPE_INCOME_DTO[] = await this._db.query(getIncomeType());
            return {HttpStatus:HttpStatus.ACCEPTED, data:type_expenses}   
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException(`error code ${error.code}`);
        }
    }
}
