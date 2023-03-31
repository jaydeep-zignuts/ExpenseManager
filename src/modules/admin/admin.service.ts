import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { group } from "console";  
import { groupBy } from "rxjs";
import { Account } from "src/entities/account.entity"; 
import { Transaction } from "src/entities/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(Account) private accountRepository:Repository<Account>,
        @InjectRepository(Transaction) private transactionRepository:Repository<Transaction>,

    ){}

    async getAccounts(){
        const accounts = await this.accountRepository.find({relations:['users']});
        return {accounts}
    }
    async getTransactions(){
        const transactions =  await this.transactionRepository.find({relations:['tr_accounts','tr_accounts.users']});
        const tranIncome = await this.transactionRepository.createQueryBuilder('i').select("SUM(transaction_amount) as totalIncome").where(`transaction_type = 'income'`).execute();
        const tranExpense = await this.transactionRepository.createQueryBuilder('i').select("SUM(transaction_amount) as totalExpense").where(`transaction_type = 'expense'`).execute();
        const tranTransfer = await this.transactionRepository.createQueryBuilder('i').select("SUM(transaction_amount) as totalTransfer").where(`transaction_type = 'transfer'`).execute();

        const totTransactionIncome = tranIncome.pop()['totalIncome'];
        const totTransactionExpense = tranExpense.pop()['totalExpense'];
        const totTransactionTransfer = tranTransfer.pop()['totalTransfer'];

        console.log(totTransactionIncome,totTransactionExpense,totTransactionTransfer);
    
       
         
        return {transactions, totTransactionIncome,totTransactionExpense,totTransactionTransfer}
    }
}