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
        return {transactions}
    }
}