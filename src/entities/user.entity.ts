import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    // onetomany
    @OneToMany(() => Account, (account) => account.users)
    accounts: Account[]; 

    // @ManyToMany(()=>Account, (ac)=>ac.account_users)
    // @JoinTable({name: "accounts_users"})
    // users_acc: Account[]

}   