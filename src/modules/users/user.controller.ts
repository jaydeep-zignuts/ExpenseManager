import { Body, Controller, Get, Param, Post, Render, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountDto } from "src/dto/account.dto";
import { UserDto } from "src/dto/user.dto";
import { AccountService } from "../accounts/accounts.service";
import { UserService } from "./user.service";
import { Request, request, response, Response } from "express";
import { RegisterBadRequest } from "src/exceptions/registerBadRequest.filter";
import { QueryFailedExceptionFilter } from "src/exceptions/queryFailedError.filter";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateAccountDto } from "src/dto/updateAccount.dto";

@ApiTags('User')
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
  async createUser(@Body() userData: Partial<UserDto>) {
      const generateUser = await this.userService.insertUser(userData);
      return generateUser;
  }

  @Get('')
  @Render('login')
  async loginRender() { }

  @Get('logout')
  @Render('login') 
  async logout(
    @Res() response: Response
  ) {
    return response.clearCookie('jwt');
  }   
  @UseGuards(JwtAuthGuard)
  @Get('addUser/:id') 
  @Render('addUser')
  async addUserToAccount(  
    @Param('id') aid: number, 
    @Req() req:Request
  ) {
    const token = req.cookies['jwt'];
    const jwtData = await this.jwtService.verify(token);
    const email = jwtData["email"];
    const allUsers = await this.userService.getAllUser(aid, email);
    return allUsers;
  }

  @UseGuards(JwtAuthGuard)
  @Post('addUser/:id')
  @Render('home') 
  async addUser(
    @Body('add_user') user: string,
    @Param('id') id: number,
    @Req() req:Request,
    @Res() res:Response

  ) {
   
    const data = await this.userService.addUser(user, id);
    
    const token = req.cookies['jwt'];
    const jwtData = await this.jwtService.verify(token);
    const email = jwtData["email"];
    return this.accountService.getAccounts(email,res);
    // return data;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Render('profile')
  async getProfile(@Req() req: Request) {
    const token = req.cookies['jwt'];
    const jwtData = await this.jwtService.verify(token);
    const email = jwtData["email"];
    return this.userService.getUser(email);
  }
  @UseGuards(JwtAuthGuard)
  @Render('home')
  @Post('profile/:id')
  async fillProfile( 
    @Body() user: Partial<UserDto>,
    @Req() req: Request,
    @Param('id') id:number,
    @Res() res:Response

    ){  
    console.log(user);
    const profile= await this.userService.fillProfile(user,id);
    const token = req.cookies['jwt'];
    const jwtData = await this.jwtService.verify(token);
    const email = jwtData["email"];
    return this.accountService.getAccounts(email,res);
    
  }
  
  @UseGuards(JwtAuthGuard)
  @Render('changePassword')
  @Get('renderChangePassword')
  async renderUpdatePassword(){  
   
  }

  @UseGuards(JwtAuthGuard)
  @Render('home')
  @Post('changePassword')
  async updatePassword( 
    @Body() user: Partial<UserDto>,
    @Req() req: Request,
    @Res() res:Response

    ){  
    const token = req.cookies['jwt'];
    const jwtData = await this.jwtService.verify(token);
    const email = jwtData["email"];
    const userData = await this.userService.getUser(email);
    console.log(userData.id);
    console.log(user);
    
    const changePassword = await this.userService.changePassword(userData.id,user);
    return this.accountService.getAccounts(email,res);
     
  }

  @Render('forgetPassword')
  @Get('renderForgetPassword')
  async renderForgetPassword(){}

  



  @Render('login')
  @Post('forgetPassword')
  async forgetPassword( 
    @Body() user: Partial<UserDto>,
    ){  
    
    const forgetPassword = await this.userService.forgetPassword(user);
    return forgetPassword;
    
  }
  
 
}  