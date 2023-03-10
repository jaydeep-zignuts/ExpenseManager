import { IsEmail, IsNotEmpty, Length } from "class-validator";


export class UserDto{

    id:number;

    @IsNotEmpty({message: 'Name is required field'})
    @Length(3,255)
    name: string;

    @IsNotEmpty({message: 'Email is required field'})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: 'Password is required field'})
    @Length(8,255)
    password: string;
  
}