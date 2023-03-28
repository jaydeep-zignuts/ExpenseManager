import { BadRequestException, Body, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';
import { request, response } from 'express';
import { AccountService } from '../accounts/accounts.service';
  
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private accountService: AccountService) { }

    async validateUserCreds(email: string, password: string): Promise<any> {
            const userdata = await this.userService.getUserByEmail(email);
            if (!userdata) throw new BadRequestException();

            if (!(await bcrypt.compare(password, userdata.password))) throw new UnauthorizedException();

            return userdata; 
       
    }

    async generateToken(user: any, response
    ) {

        const jwt = this.jwtService.sign({
            email: user.email,
        })
        
        response.cookie('jwt', jwt, { httpOnly: true });        
        const userdata= await this.userService.getUser(user.email);
        console.log("My User",userdata);
        // if(userdata.role=="user"){
            // return await response.redirect("profile");
            return await this.accountService.getAccounts(user.email,response);

        // }else{
        //     // return await this.accountService.getAccounts(user.email);
        // } 
    }
}
