import { IsNotEmpty } from "class-validator";


export class AccountDto {
    
    id:number;

    // @IsNotEmpty({message:'Name field must contain name of account'})
    account_name: string;

    userId: number;

   
}