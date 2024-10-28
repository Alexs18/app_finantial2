import { Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { IncomeService } from 'src/services/income/income.service';

@Controller('income')
export class IncomeController {

    constructor(
        private readonly incomeservices:IncomeService
    ){

    }

    @Post('/createincome')
    createincome(){
        
    }

    @Get('/getincome')
    getincome(){

    }

    @Put('/updateincome')
    updateincome(){

    }

    @Delete('/deleteincome')
    deleteincome(){

    }

    @Post('/createtypeincome')
    createtypeincome(){

    }

    @Get('/gettypeincome')
    gettypeincome(){
        return this.incomeservices.getTypeIncome();
    }

    @Put('/updatetypeincome')
    updatetypeincome(){

    }

    @Delete('/deletetypeincome')
    deletetypeincome(){

    }

}
