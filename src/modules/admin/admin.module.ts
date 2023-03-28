import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports:[AccountsModule, TypeOrmModule.forFeature([Transaction, Account])],
    providers:[AdminService],
    controllers:[AdminController]
})
export class AdminModule {}
