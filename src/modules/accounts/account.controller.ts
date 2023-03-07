import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Render, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { request, Request } from "express";
import { AccountDto } from "src/dto/account.dto";
import { UserService } from "../users/user.service";
import { AccountService } from "./accounts.service";

@Controller('ac')
export class AccountController{
    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private jwtService: JwtService
        ){} 
        // @Get('renderAddTransaction/:id')
        // @Render('addTransaction')
        // async renderAddTransaction(){}
    @Get('addNewAccount')
    @Render('addNewAccount')
    async renderNewAccount(){}

    @Post('addNewAccount')
    @Render('home') 
    async newAccount(
        @Body() accountName: AccountDto, 
        @Req() request: Request
    ){
        const token = request.cookies['jwt'];
        const data = await this.jwtService.verify(token);
        const email = data['email'];

        const user = this.userService.getUserByEmail(email);
        const newAccount = this.accountService.createNewAccount(accountName,email)
        return newAccount;
    }

    @Get('getAll')
    @Render('home')
    async getAccounts(       
         @Req() request: Request
    ){

        const token = request.cookies['jwt'];
        const data = await this.jwtService.verify(token);
        const email = data['email'];
        console.log("Logged email",email);
        
        const allAccount = this.accountService.getAccounts(email);
        return allAccount;
    }
    
    @Get('/delete/:id')
    @Render('home')
    async deleteAccount(
        @Param() id: AccountDto,
        // @Req() request :Request
    ) {
        const deleteAccount = await this.accountService.deleteAccount(id.id);
        return deleteAccount;
    }

    @Get('/edit/:id')
    @Render('editAccountName')
    async renderEditAccountName(
        @Param() id:AccountDto,
        @Body() account: AccountDto
    ){
        const acnm = await this.accountService.getAccountById(id.id)
        return acnm;

    }

   
    @Post('/editAccountName/:id')
    @Render('home')
    async editAccountName(
        @Param() id:AccountDto, 
        @Body() account: AccountDto
    ){        
        const updateAccount = await this.accountService.editAccountName(id.id, account.account_name);
        return updateAccount;
    }


}