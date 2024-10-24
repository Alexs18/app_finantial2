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