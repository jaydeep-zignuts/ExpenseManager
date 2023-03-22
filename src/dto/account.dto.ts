import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class AccountDto {
    @ApiProperty({description:'Id of account', example:'1'})
    id:number;

    @ApiProperty({description:'Name of account', example:'my acc / jaydeep'})
    @IsNotEmpty({message:'account name field must contain name of account'})
    account_name: string;

    userId: number;
}
