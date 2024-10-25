import { stat } from "fs";
import { RESTORE_PASSWORD, USER_DTO } from "src/models/user.dto";

export function insertuserSql(user:USER_DTO, password:string){

    return `insert into app_finantial.USERS (first_name, last_name, user_name, password,
    id_type_user) values ('${user.first_name}', '${user.last_name}', '${user.username}',
    '${password}', ${user.id_user_type}) returning *`
}
export function createrestorepassword(restorepassword:RESTORE_PASSWORD){
    const {code,id_user} = restorepassword;
    return `insert into app_finantial.restore_password (code,
	creation_date,
	creation_time,
    expiration_time,
	id_user) values (
    ${code}, current_date, current_time,(current_time +  INTERVAL '5 minutes') ,${id_user}) returning id_restore, code`
}

export function getuserlogin(mail:string){
    return `select id_user, password, user_name from app_finantial.users where mail =  '${mail}'`
}

export function validatecode(code:number, id_user:number){
    return `select app_finantial.validateuser(${id_user}, ${code}) as validated`
}

export function restorepassword(mail:string, password) {
    return `update app_finantial.users set password = '${password}' where mail = '${mail}' returning *`
}

export function restrictionmailforday(id_user:number){
    return `select count(id_restore) as attempts from app_finantial.restore_password where id_user = ${id_user} and creation_date = current_date`
}