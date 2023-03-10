import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { response } from "express";
import { AccountDto } from "src/dto/account.dto";
import { TransactionDto } from "src/dto/transaction.dto";
import { UserDto } from "src/dto/user.dto";
import { Account } from "src/entities/account.entity";
import { Transaction } from "src/entities/transaction.entity";
import { User } from "src/entities/user.entity";
import { getConnection, Repository } from "typeorm";

@Injectable()
export class AccountService{
    constructor(
        @InjectRepository(User) private userRepository : Repository<User>,
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>
    ) { }

    async createNewAccount(account : AccountDto, email: string){

        const user = await this.userRepository
        .findOne({ where: { email }, relations: ['accounts'] });

        const newAccount = await this.accountRepository.save({
            account_name: account.account_name
        })
        user.accounts = [newAccount, ...user.accounts];

        await user.save();
        return newAccount;
    

    }

    async getAccounts(email:string){
        console.log("Account of loggwtd in ser", email);
        
        const user = await this.userRepository.findOne({ where: { email:email }, relations:['accounts'] });
        const userid = user.id;
        console.log(user);
        
        // const getaccountid=await this.accountRepository.find({where: { id: user.id }})
        // const allAccount = await this.accountRepository.find({where:{id : userid}});
        const allAccount = await this.accountRepository.createQueryBuilder('ac').leftJoin('ac.users', 'acc').where(`acc.id = ${userid}`).getMany()
        
        console.log("all Acount >>>>>>>>",allAccount);
        const addedByUser = await this.accountRepository.createQueryBuilder('acus').leftJoin('acus.us','ac_user').where(`ac_user.id=${userid}`).getMany();
        console.log(addedByUser);
        

        return { allAccount, addedByUser };    
    }
    async deleteAccount(aid: number){
        const acc= await this.accountRepository.delete(aid);
        // return response.render('home',{dmsg:'Account Deleted Successfully'})
        return {dmsg:'Account deleted successfully'};
    }
    async getAccountById(aid: number ){
        
        // const accountbyid = await this.accountRepository.findOne({ where: {id: aid }, relations: ['users'] });  
        
        const accountbyid = await this.accountRepository.createQueryBuilder('acc').leftJoin('acc.users', 'users').where(`acc.id = ${aid}`).getOne()

        const aname = accountbyid.account_name;
        const acid = accountbyid.id;       
        
        return {aname, acid};
        
    }
    async editAccountName(aid:number, accnm: string){
        console.log(accnm , aid );
        const acnm = await this.accountRepository.update({id: aid },{account_name: accnm});
        
        return acnm;
        
    }
     async deleteTransaction(id:number){
        const delObj =await this.transactionRepository.createQueryBuilder('t').leftJoinAndSelect('t.tr_accounts','tracc').where(`tracc.id=${id}`).getMany();
        return this.transactionRepository.remove(delObj);

    }
    
}