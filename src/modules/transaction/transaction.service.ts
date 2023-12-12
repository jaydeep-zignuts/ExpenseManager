import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response, Request, Response } from 'express';
import { AccountDto } from 'src/dto/account.dto';
import { TransactionDto } from 'src/dto/transaction.dto';
import { Account } from 'src/entities/account.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async getAccountById(aid: number) {
    const accountbyid = await this.accountRepository.findOne({
      where: { id: aid },
      relations: ['transactions'],
    });
    const aname = accountbyid.account_name;
    const acid = accountbyid.id;
    return { aname, acid };
  }
  async addTransaction(transaction: TransactionDto, qid: number) {
    try {
      const account = await this.accountRepository.findOne({
        where: { id: qid },
        relations: ['transactions'],
      });
      const newTransaction = await this.transactionRepository.save({
        transaction_type: transaction.transaction_type,
        description: transaction.description,
        transaction_amount: transaction.transaction_amount,
      });
      account.transactions = [newTransaction, ...account.transactions];
      await account.save();
      return newTransaction;
    } catch (e) {
      return response.render('400', { e });
    }
  }

  async getTransactions(tid: number) {
    console.log('My accid', tid);
    const transactions = await this.transactionRepository
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.tr_accounts', 'tacc')
      .where(`tacc.id = ${tid}`)
      .getMany();
    const tra = transactions.reverse();

    return { tra, tid };
  }

  async deleteTransaction(id: number) {
    return await this.transactionRepository.delete(id);
  }

  async renderEditTransaction(tid: number) {
    const tr = await this.transactionRepository
      .createQueryBuilder('tra')
      .leftJoin('tra.tr_accounts', 't')
      .where(`tra.id = ${tid}`)
      .getOne();

    const transactions = tr;
    return { transactions };
  }
  async editTransaction(
    tid: number,
    ttype: string,
    tamt: number,
    tdesc: string,
  ) {
    const editTransaction = await this.transactionRepository.update(
      { id: tid },
      {
        transaction_type: ttype,
        transaction_amount: tamt,
        description: tdesc,
      },
    );

    return editTransaction;
  }
  async getListTransaction(req: Request, res: Response, id: number) {
    const transactions = await this.transactionRepository
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.tr_accounts', 'tacc')
      .where(`tacc.id = ${id}`)
      .getMany();
    console.log(transactions);

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.fontSize(25).text(JSON.stringify(transactions));
    doc.end();

    return { tra: transactions };
  }
}
