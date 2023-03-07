import { BadRequestException, Body, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';
import { response } from 'express';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUserCreds(email: string, password: string): Promise<any> {
        try {
            const userdata = await this.userService.getUserByEmail(email);
            if (!userdata) throw new BadRequestException();

            if (!(await bcrypt.compare(password, userdata.password))) throw new UnauthorizedException();

            return userdata;
        } catch (e) {
            throw new UnauthorizedException
        }


    }

    async generateToken(user: any, response
    ) {

        const jwt = this.jwtService.sign({
            email: user.email,
        })
        response.cookie('jwt', jwt, { httpOnly: true });


    }
}
