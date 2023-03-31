import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Render, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AccountDto } from "src/dto/account.dto";
import { TransactionDto } from "src/dto/transaction.dto";
import { EditAccountBadRequest } from "src/exceptions/editAccountBadRequest.filter";
import { EditTransactionBadRequest } from "src/exceptions/editTransactionBadRequest.filter";
import { TransactionBadRequest } from "src/exceptions/transactionbadRequest.filter";
import { AccountService } from "../accounts/accounts.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "../users/user.service";
import { TransactionService } from "./transaction.service";

@ApiTags('Transaction')
@Controller('tr')
@UseGuards(JwtAuthGuard)
export class TransactionController {
    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private transactionService: TransactionService,
        private jwtService : JwtService
    ) { } 

    @Get('renderAddTransaction/:id')
    @Render('addTransaction')
    async renderAddTransaction(
        @Param() id: number

    ) {
        return id;
    }

    @Post('addTransaction/:id')
    @UsePipes(ValidationPipe)
    @UseFilters(TransactionBadRequest)
    @Render('home')
    async addTransaction(
        @Body() transaction: TransactionDto,
        // @Body() account: AccountDto,
        @Param('id') id: number ,
        @Req() req:Request,
        @Res() res:Response

    ) {
        const acda = await this.transactionService.getAccountById(id);
        console.log(acda,"acda");
        
        const newTransaction = await this.transactionService.addTransaction(transaction, acda.acid);
        const token = req.cookies['jwt'];
        const data1 = await this.jwtService.verify(token);
        const email = data1["email"];
        return await this.accountService.getAccounts(email,res)
        // return newTransaction;
    }

    @Get('showTransaction/:id')
    @Render('showTransaction')
    async showTransactions(
        @Param('id') id: number
    ) {
        const acda = await this.transactionService.getAccountById(id);
        const transactions = await this.transactionService.getTransactions(acda.acid);
        return transactions;
    }
    @Get('refShowTransaction/:id')
    @Render('refShowTransaction')
    async refShowTransactions(
        @Param('id') id: number
    ) {
        const acda = await this.transactionService.getAccountById(id);
        const transactions = await this.transactionService.getTransactions(acda.acid);
        return transactions;
    }

    @Get('delete/:id')
    @Render('home')
    async deleteTransaction(
        @Param() id: number,
        @Req() req:Request,
        @Res() res:Response

    ) {
        const delTransaction = await this.transactionService.deleteTransaction(id);
        const token = req.cookies['jwt'];
        const data1 = await this.jwtService.verify(token);
        const email = data1["email"];
        return await this.accountService.getAccounts(email,res);
        // return delTransaction;
    }

    @Get('renderEditTransaction/:id')
    @Render('editTransaction')
    async renderEditTransaction(
        @Param('id') id: number,
        @Req() req: Request

    ) { 
        const transactionData = await this.transactionService.renderEditTransaction(id);
        return transactionData;
    }

    @Post('/editTransaction/:id')
    @UsePipes(ValidationPipe)
    @UseFilters(EditTransactionBadRequest)
    @Render('home')
    async editTransaction(
        @Param('id') tid: number,
        @Body() transaction: TransactionDto,
        @Req() req: Request,
        @Res() res:Response

    ) {
        const editTransaction = await this.transactionService.editTransaction(tid, transaction.transaction_type, transaction.transaction_amount, transaction.description);
        // return editTransaction;
        const token = req.cookies['jwt'];
        const data1 = await this.jwtService.verify(token);
        const email = data1["email"];
        return await this.accountService.getAccounts(email,res);
         
    }
    @Render('transaction_month')
  @Get('genListTransaction/:id')
  async getListTransaction(
    @Req() req: Request,
    @Res() res:Response,
    @Param('id') id: number

  ){
    const acda = await this.transactionService.getAccountById(id);

    return await this.transactionService.getListTransaction( req, res, acda.acid);
  }
}