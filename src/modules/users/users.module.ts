import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Transaction } from 'src/entities/transaction.entity'; 
import { User } from 'src/entities/user.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionModule } from '../transaction/transaction.module'; 
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        forwardRef( ()=> AccountsModule ),
        forwardRef( ()=> TransactionModule ),        

        TypeOrmModule.forFeature([User, Account, Transaction] ), 
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d'}
        }),
        ],
    providers: [UserService],
    controllers: [UserController],
    exports:[UserService]
})

export class UsersModule {}
