export function getIncomeType(){
    return `select id_type_income, trim(description) as description from app_finantial.type_income`
}