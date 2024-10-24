import { USER_DTO } from "src/models/user.dto";

export function insertuserSql(user:USER_DTO, password:string){

    console.log(`insert into app_finantial.USERS (first_name, last_name, user_name, password,
    id_type_user) values ('${user.first_name}', '${user.last_name}', '${user.username}',
    '${password}', ${user.id_user_type}) returning *`);
    
    return `insert into app_finantial.USERS (first_name, last_name, user_name, password,
    id_type_user) values ('${user.first_name}', '${user.last_name}', '${user.username}',
    '${password}', ${user.id_user_type}) returning *`
}