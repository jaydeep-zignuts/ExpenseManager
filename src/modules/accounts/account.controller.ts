import { Body, Controller, Get, Param, Post, Render, Req, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { request, Request } from "express";
import { AccountDto } from "src/dto/account.dto";
import { AddAccountBadRequest } from "src/exceptions/addAccountBadRequest.filter";
import { EditAccountBadRequest } from "src/exceptions/editAccountBadRequest.filter";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TransactionService } from "../transaction/transaction.service";
import { UserService } from "../users/user.service";
import { AccountService } from "./accounts.service";

@ApiTags('Account')
@UseGuards(JwtAuthGuard)
@Controller('ac')
export class AccountController{
    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private transactionService: TransactionService,
        private jwtService: JwtService
        ){} 
        // @Get('renderAddTransaction/:id')
        // @Render('addTransaction')
        // async renderAddTransaction(){}
    @Get('addNewAccount')
    @Render('addNewAccount')
    async renderNewAccount(){}

    @Post('addNewAccount')
    @UseFilters(AddAccountBadRequest)
    @Render('home') 
    async newAccount(
        @Body() accountName: AccountDto, 
        @Req() request: Request
    ){
        const token = request.cookies['jwt'];
        const data = await this.jwtService.verify(token);
        const email = data['email'];

        const user = await this.userService.getUserByEmail(email);
        const newAccount = await this.accountService.createNewAccount(accountName,email)


        return await this.accountService.getAccounts(email);
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
        @Param('id') id: number,
        @Req() req:Request
    ) {
        // const delTransaction= await this.accountService.deleteTransaction(id);
        // console.log("=======",delTransaction);
        
        const deleteAccount = await this.accountService.deleteAccount(id);
        const token = req.cookies['jwt'];
        const data1 = await this.jwtService.verify(token);
        const email = data1["email"];
        return await this.accountService.getAccounts(email)
    
    }

    @Get('/edit/:id')
    @Render('editAccountName')
    async renderEditAccountName(
        @Param('id') id:number, 
        // @Body() account:AccountDto 
    ){
        
        const acnm = await this.accountService.getAccountById(id)
        return acnm;
 
    }
//change like above
    @Post('/editAccountName/:id')
    @UsePipes(ValidationPipe)
    @UseFilters(EditAccountBadRequest)
    @Render('home')
    async editAccountName(
        @Param('id') id: number, 
        @Body() account: AccountDto,
        @Req() req:Request,
        ){        
            console.log("hello edit");
            
        const updateAccount = await this.accountService.editAccountName(id, account.account_name);
        const token = req.cookies['jwt'];
        const data1 = await this.jwtService.verify(token);
        const email = data1["email"];
        return await this.accountService.getAccounts(email);
        // return updateAccount;
    }

}