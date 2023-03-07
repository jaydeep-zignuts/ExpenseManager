import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { User } from 'src/entities/user.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
    imports: [
        forwardRef( ()=> AccountsModule ),
        forwardRef( ()=> UsersModule ),

        TypeOrmModule.forFeature([User, Account, Transaction] ), 
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d'}
        }),
        EventEmitterModule.forRoot({
            newListener: true,
        })
    ],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports:[TransactionService]
})
export class TransactionModule {}
