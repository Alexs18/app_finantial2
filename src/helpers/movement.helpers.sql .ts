import { MOVEMENT_DTO } from "src/models/movemnt.dto"

export function insertmovement_sql(movement:MOVEMENT_DTO){

    const {amount,comment_fm,id_type_movement,id_user} = movement;
    return `insert into app_finantial.finantial_movement
    (id_user, amout, date, comment_fm, id_type_movement)
    values(${id_user}, ${amount}, current_date, '${comment_fm}', ${id_type_movement}) returning id_finantial_movement
    `
    
}

export function insertexpenses_or_income(id_finantial_movement:number, id_type_expenses_or_income:number, id_type_movement:number){

    return `select app_finantial.insert_income_or_expenses(${id_type_expenses_or_income}, ${id_type_movement}, ${id_finantial_movement})`

}