import { MESSAGES } from "@nestjs/core/constants";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class TransactionDto{

    @ApiProperty({description:'Id of Transaction', example:'1'})
    id:number;

    @ApiProperty({description:'Type of Transaction', example:'Income/Expense/Transfer'})
    @IsNotEmpty({message:'transaction type must contain type of transaction'})
    transaction_type: string;

    @ApiProperty({description:'Description of Transaction', example:'For Home Rent'})
    @IsNotEmpty({ message:'description field must contain description about transaction'})
    description: string;

    @ApiProperty({description:'Amount of Transaction', example:'1000'})
    @IsNotEmpty({ message:'transaction amount field must contain amount' })
    transaction_amount: number;

    tr_accounts: number
     
  
}