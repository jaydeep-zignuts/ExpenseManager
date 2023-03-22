import { Body, Controller, Get, Post, Render, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginUnauthorized } from 'src/exceptions/loginUnauthorized.filter';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @UseFilters(LoginUnauthorized)
    @Render('home')
    async login(
        @Body() email,
        @Res({ passthrough: true }) response: Response

    ): Promise<any> {

        return await this.authService.generateToken(email,response);
    }

}
