import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
const Mobile_Rule=/^(\+\d{1,3}[- ]?)?\d{10}$/

export class UserDto{
    // @ApiProperty({description: 'Id of the user' , example:"1"})
    // id:number;

    @ApiProperty({description: 'Name of the user' , example:"John Doe"})
    @IsNotEmpty({message: 'Name is required field'})
    @Length(3,255)
    name: string;

    @ApiProperty({ description: 'Email of the user', example :'johndoe@gmail.com' })
    @IsNotEmpty({message: 'Email is required field'})
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Hashed user password' })
    @IsNotEmpty({message: 'Password is required field'})
    @Length(8,16)   
    password: string;

    @ApiProperty({ description: 'Phone Number of the user', example :'9898787878' })
    @IsNumber()
    phoneno: number; 

    @ApiProperty({ description: 'city of the user', example :'Nadiad' })
    @IsString()
    city: string
 
    @ApiProperty({ description: 'state of the user', example :'Gujarat' })
    @IsString()
    state: string

    @ApiProperty({ description: 'Zipcode of the user city', example :'182211' })
    @IsNumber()
    zipcode: number
}