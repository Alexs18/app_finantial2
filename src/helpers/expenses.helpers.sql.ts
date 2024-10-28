export function getexpensesquery(){
    return `select id_type_expenses, trim(description) as description from app_finantial.type_expenses`
}