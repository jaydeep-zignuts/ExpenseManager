import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/dto/user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Account } from "src/entities/account.entity";
import * as nodemailer from 'nodemailer';
import { request, response } from "express";
import { JwtService } from "@nestjs/jwt";
import { PassThrough } from "stream";



@Injectable() 
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  private jwtService: JwtService
  ) { } 

  async insertUser(user: Partial<UserDto>) { 

    const salt = await bcrypt.genSalt();
    const bcryptPassword = await bcrypt.hash(user.password, salt);

    let userdata = new User();
    userdata.name = user.name;
    userdata.email = user.email;
    userdata.password = bcryptPassword;

    userdata = await userdata.save();

    let defAcc = new Account();
    defAcc.account_name = user.name;
    defAcc = await defAcc.save();

    userdata.accounts = [defAcc];

    await userdata.save();

    if (userdata) {
      let transporter = await nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
          user: 'jaydeeppatel3082001@gmail.com',
          pass: 'gsgb evnw usxa oclb', 
        },
      });

      let info = await transporter.sendMail({
        from: '"jaydeeppatel3082001@gmail.com"',
        to: userdata.email,
        subject: 'Expense Manager ',
        text: 'Welcome to Expense Manager. This Website help you to manage your expense', // plain text body
        html: `<p>Welcome to <b>Expense Manager</b>. This Website help you to manage your expenses</p> `, // html body
      });
      console.log('mail info :: ', info);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return { userdata };
    
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getAllUser(aid: number, email:string) {
    const allUsers = await this.userRepository.find();    
    return { allUsers, aid, email }
  }  

  async addUser(email: string, id: number) { 
    const uemail = email;   
   
    const user = await this.userRepository.findOne({ where: { email: email }, relations: ['accounts'] });
    const account = await this.accountRepository.findOne({ where: { id: id }, relations: ['us'] });
    account.us = [user, ...account.us];

    await user.save();
    await account.save();
   
  } 
  async getUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  async fillProfile(user: Partial<UserDto>,id:number){
    const userData = await this.userRepository.update({id:id},{
      name: user.name,
      email: user.email,
      phoneno:user.phoneno,  
      city:user.city, 
      state: user.state, 
      zipcode:user.zipcode 
    });  
    console.log(userData);
    return userData;  
    
  }
 
  async changePassword(id:number, user: Partial<UserDto>){
  
    
    const salt = await bcrypt.genSalt();
    const bcryptPassword = await bcrypt.hash(user.password, salt);
    console.log(salt, bcryptPassword);
    const updatePassword = await this.userRepository.update({id: id},{password:bcryptPassword})
    return updatePassword;
  }

  async forgetPassword(user:Partial<UserDto>){
    const salt = await bcrypt.genSalt();
    const bcryptPassword = await bcrypt.hash(user.password, salt);
    console.log(salt, bcryptPassword);
    const forgetPassword = await this.userRepository.update({email:user.email},{password:bcryptPassword})
    return forgetPassword;

  }
  async getUserById(id:number){
    const admin=await this.userRepository.findOne({where:{id}});
    return admin;
}
}