import { IsNotEmpty } from "class-validator";


export class AccountDto {
    
    id:number;

    @IsNotEmpty({message:'account name field must contain name of account'})
    account_name: string;

    userId: number;

   
}
// partialtypes