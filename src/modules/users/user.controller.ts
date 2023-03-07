import { Body, Controller, Delete, Get, Param, Post, Render, Res, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountDto } from "src/dto/account.dto";
import { UserDto } from "src/dto/user.dto";
import { AccountService } from "../accounts/accounts.service";
import { UserService } from "./user.service";
import * as nodemailer from 'nodemailer';
import { response, Response } from "express";
import { HttpBadRequestExceptionFilter } from "src/exceptions/httpBadRequestException.filter";

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
  @UseFilters(HttpBadRequestExceptionFilter)
  @Render('login')
  async createUser(@Body() userData: UserDto, @Body() account: AccountDto) {
    try{
      const generateUser = await this.userService.insertUser(userData);
      return generateUser;
    }catch(e){
      console.log("error is ",e );
      
      response.render('register',{e})
    }
    
  }

  @Get('')
  @Render('login')
  async loginRender() { }

  // @Post('login')
  // @Render('home')
  // async loginChk(
  // @Body() userData : UserDto,
  // @Res({ passthrough: true }) response: Response
  // ){
  //   const cred = await this.userService.loginchk(userData);

  //   const email = cred.email;

  //   const jwt = await this.jwtService.sign({
  //     email: email
  //   });

  //   response.cookie('jwt', jwt , { httpOnly: true });
  //   return this.accountService.getAccounts(email);

  // }

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
    @Param() aid: AccountDto
  ) {
    const allUsers = await this.userService.getAllUser(aid.id);
    return allUsers;
  }

  @Post('addUser/:id')
  @Render('home')
  async addUser(
    @Body() user: UserDto,
    @Param() id: AccountDto
  ) {
    const data = await this.userService.addUser(user["add_user"], id.id);
    return data;
  }


}