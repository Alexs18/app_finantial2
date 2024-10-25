import {hash, genSalt, compare} from 'bcrypt'


export async function generateToken(){      
    
}

export async function checkpassword(password:string, pswencript:string){
    return await compare(password, pswencript);
}

export async function encrytpassword(password:string){
    const salt = await genSalt(10);
    const passwordcryp = await hash(password, salt);
    return passwordcryp;
}

export function generatenumberrandom(){
    const numDigits = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}