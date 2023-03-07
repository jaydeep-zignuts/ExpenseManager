import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { User } from 'src/entities/user.entity';
import { TransactionModule } from '../transaction/transaction.module';
import { UsersModule } from '../users/users.module';
import { AccountController } from './account.controller';
import { AccountService } from './accounts.service';

@Module({
    imports: [ 
        forwardRef(()=> UsersModule ), 
        forwardRef( ()=> TransactionModule ),

        TypeOrmModule.forFeature([User, Account, Transaction] ), 
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d'}
        }),
    ],

    providers: [AccountService],
    controllers: [AccountController],
    exports: [AccountService]
})
export class AccountsModule {}
