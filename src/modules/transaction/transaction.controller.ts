import { Body, Controller, Get, Param, Post, Render } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AccountDto } from "src/dto/account.dto";
import { TransactionDto } from "src/dto/transaction.dto";
import { AccountService } from "../accounts/accounts.service";
import { UserService } from "../users/user.service";
import { TransactionService } from "./transaction.service";

@Controller('tr')
export class TransactionController {
    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private transactionService: TransactionService
    ) { }

    @Get('renderAddTransaction/:id')
    @Render('addTransaction')
    async renderAddTransaction(
        @Param() id: number

    ) {
        return id;
    }

    @Post('addTransaction/:id')
    @Render('home')
    async addTransaction(
        @Body() transaction: TransactionDto,
        @Body() account: AccountDto,
        @Param() id: AccountDto
    ) {
        const acda = await this.transactionService.getAccountById(id.id);
        const newTransaction = await this.transactionService.addTransaction(transaction, acda.acid);
        return newTransaction;
    }

    @Get('showTransaction/:id')
    @Render('showTransaction')
    async showTransactions(
        @Param() id: AccountDto
    ) {
        const acda = await this.transactionService.getAccountById(id.id);
        const transactions = await this.transactionService.getTransactions(acda.acid);
        return transactions;
    }

    @Get('delete/:id')
    @Render('showTransaction')
    async deleteTransaction(
        @Param() id: number
    ) {
        const delTransaction = await this.transactionService.deleteTransaction(id);
        return delTransaction;
    }

    @Get('renderEditTransaction/:id')
    @Render('editTransaction')
    async renderEditTransaction(
        @Param() transaction: TransactionDto
    ) {
        const transactionData = await this.transactionService.renderEditTransaction(transaction.id);
        return transactionData;
    }

    @Post('/editTransaction/:id')
    @Render('showTransaction')
    async editTransaction(
        @Param() tid: TransactionDto,
        @Body() transaction: TransactionDto
    ) {
        const editTransaction = await this.transactionService.editTransaction(tid.id, transaction.transaction_type, transaction.transaction_amount, transaction.description);
        return editTransaction;
    }
}