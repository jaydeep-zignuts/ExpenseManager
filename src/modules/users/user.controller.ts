import { Body, Controller, Get, Param, Post, Render, Req, Res, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountDto } from "src/dto/account.dto";
import { UserDto } from "src/dto/user.dto";
import { AccountService } from "../accounts/accounts.service";
import { UserService } from "./user.service";
import { Request, request, response, Response } from "express";
import { RegisterBadRequest } from "src/exceptions/registerBadRequest.filter";
import { QueryFailedExceptionFilter } from "src/exceptions/queryFailedError.filter";


@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService,
    private jwtService: JwtService,
  ) { }

  @Get('registerRender')
  @Render('register')
  async registerRender() { }

  @Post('register')    
  @UsePipes(ValidationPipe)
  @UseFilters(RegisterBadRequest)
  @UseFilters(QueryFailedExceptionFilter)
  @Render('login')
  async createUser(@Body() userData: UserDto) {
      const generateUser = await this.userService.insertUser(userData);
      return generateUser;
 
  }

  @Get('')
  @Render('login')
  async loginRender() { }

  @Post('logout')
  @Render('login')
  async logout(
    @Res() response: Response
  ) {
    return response.clearCookie('jwt');
  }

  @Get('addUser/:id')
  @Render('addUser')
  async addUserToAccount(
    @Param('id') aid: number
  ) {
    const allUsers = await this.userService.getAllUser(aid);
    return allUsers;
  }

  @Post('addUser/:id')
  @Render('home')
  async addUser(
    @Body('add_user') user: string,
    @Param('id') id: number,
    @Req() req:Request,
  ) {
   
    const data = await this.userService.addUser(user, id);
    
    const token = req.cookies['jwt'];
    const jwtData = await this.jwtService.verify(token);
    const email = jwtData["email"];
    return this.accountService.getAccounts(email);
    // return data;
  }


}  