import { Controller, Get, Render } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccountService } from "../accounts/accounts.service";
import { AdminService } from "./admin.service";

@ApiTags("Admin")
@Controller('admin')
export class AdminController{
      
    constructor(
        private accountService:AccountService,
        private adminService:AdminService
        ){}

    @Get('allAccounts')
    @Render('adminAccounts')
    async getAllAccounts(){
        return this.adminService.getAccounts();
    }

    @Get('getAllTransaction')
    @Render('adminTransaction')
    async getAllTransaction(){
        return this.adminService.getTransactions();
    }

     
}