import { MESSAGES } from "@nestjs/core/constants";
import { IsNotEmpty, IsNumber } from "class-validator";

export class TransactionDto{

    id:number;

    @IsNotEmpty({message:'transaction type must contain type of transaction'})
    transaction_type: string;

    @IsNotEmpty({message:'description field must contain description about transaction'})
    description: string;

    @IsNotEmpty({message:'transaction amount field must contain description about transaction'})
    @IsNumber()
    transaction_amount: number;


    @IsNotEmpty()
    tr_accounts: number
     
  
}