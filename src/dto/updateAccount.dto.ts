import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AccountDto } from './account.dto';

export class UpdateAccountDto extends PartialType(AccountDto) {}
