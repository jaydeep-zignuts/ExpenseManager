import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";


export class UserDto{
    @ApiProperty({description: 'Id of the user' , example:"1"})
    id:number;

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

    @Length(10)
    phoneno: number;

    city: string

    state: string

    zipcode: number
}