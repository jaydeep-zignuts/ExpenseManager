import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";

@Entity('account')
export class Account extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    account_name: string;

    @ManyToOne(()=> User, (user)=> user.accounts ) 
    @JoinColumn({name:'user_id'})
    users: User[] 

   

    @ManyToMany(()=> User) 
    @JoinTable({ name: 'user_account' })
    us : User[]

    // onetomany 
    @OneToMany(()=>Transaction, (transaction)=>transaction.tr_accounts)
    transactions: Transaction[];
   
}                  