import { Controller, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ExpensesService } from 'src/services/expenses/expenses.service';

@Controller('expenses')
export class ExpensesController {
    constructor(
        private readonly expenseservices:ExpensesService
    ){

    }

    @Post('/createexpenses')
    createexpenses(){
        
    }

    @Get('/getexpenses')
    getexpenses(){
        
    }

    @Put('/updateexpenses')
    updateexpenses(){

    }

    @Delete('/deleteexpenses')
    deleteexpenses(){

    }

    @Post('/createtypeexpenses')
    createtypeexpenses(){

    }
    @Get('/gettypeexpenses')
    gettypeexpenses(){

        return this.expenseservices.getTypeExpenses()

    }

    @Put('/updatetypeexpenses')
    updatetypeexpenses(){

    }

    @Delete('/deletetypeexpenses')
    deletetypeexpenses(){

    }


}
