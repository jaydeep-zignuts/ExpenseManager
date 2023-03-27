import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity('users')
export class User extends BaseEntity {

    @ApiProperty({description: 'Id of the user' , example:"1"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: 'Name of the user' , example:"John Doe"})
    @Column()
    name: string;

    @ApiProperty({ description: 'Email of the user', example :'johndoe@gmail.com' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ description: 'Hashed user password' })
    @Column()
    password: string;

    @Column()
    phoneno: number;

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    zipcode: number
    // onetomany
    @OneToMany(() => Account, (account) => account.users)
    accounts: Account[]; 

    // @ManyToMany(()=>Account, (ac)=>ac.account_users)
    // @JoinTable({name: "accounts_users"})
    // users_acc: Account[]
 
}    