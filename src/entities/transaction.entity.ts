import { timestamp } from "rxjs";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Account } from "./account.entity";

@Entity('transactions')
export class Transaction extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    transaction_type: string;

    @Column()
    transaction_amount: number;
    
    @Column()
    description: string;

    // @Column({ type: 'date', default:  })
    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(()=> Account, (account)=> account.transactions,{onDelete:"CASCADE"} ) 
    @JoinColumn({name: 'account_id' })
    tr_accounts: Account
     
}  


    