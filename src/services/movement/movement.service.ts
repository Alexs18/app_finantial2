import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { setDefaultResultOrder } from 'dns';
import { insertexpenses_or_income, insertmovement_sql } from 'src/helpers/movement.helpers.sql ';
import { MOVEMENT_DTO } from 'src/models/movemnt.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class MovementService {

    constructor(private readonly _db:DataSource){}

    async createmovement(movement:MOVEMENT_DTO){
        try {
            
            const insertmovement:{id_finantial_movement:number}[] = await this._db.query(insertmovement_sql(movement));
            return await this.insertexpensesorincome(insertmovement[0].id_finantial_movement, movement.id_type_expenses_or_income, movement.id_type_movement);
            
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException('OCURRIO UN ERROR AL INSERT EL MOVIMIENTO')
        }

    }

    private async insertexpensesorincome(id_finantial_movement:number, id_type_expenses_or_income:number, id_type_movement:number){

        try {
            const insertexpensesorincomedata = await this._db.query(insertexpenses_or_income(id_finantial_movement, id_type_expenses_or_income, id_type_movement))
            return {HttpStatus:HttpStatus.ACCEPTED, message:'Transaccion registrada correctadamente',
                data:{
                    tipo_movimiento:id_type_movement==1? 'INGRESO': 'EGRESO',
                    id_transaccion: id_finantial_movement,
                    data:insertexpensesorincomedata[0]
                }};    
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException(`OCURRIO UN ERROR AL INSERT EL ${id_type_movement==1? 'INGRESO': 'EGRESO'}`)
        }
        
    }

}
