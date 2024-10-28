import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { getexpensesquery } from 'src/helpers/expenses.helpers.sql';
import { TYPE_EXPENSES_DTO } from 'src/models/expenses.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ExpensesService {
    constructor(
        private readonly _db:DataSource
    ){

    }

    async getTypeExpenses(){
        try {
            const type_expenses:TYPE_EXPENSES_DTO[] = await this._db.query(getexpensesquery());
            return {HttpStatus:HttpStatus.ACCEPTED, data:type_expenses}   
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException(`error code ${error.code}`);
        }
    }





































    










































}
