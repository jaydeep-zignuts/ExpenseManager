import { Body, Controller, Get, Post, Render, Req, Request, Res, UnauthorizedException, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserDto } from 'src/dto/user.dto';
import { HttpUnauthorizedExceptionFiletr } from 'src/exceptions/httpUnauthorizedException.filter';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @UseFilters(new HttpUnauthorizedExceptionFiletr())
    @Render('home')
    async login(
        @Request() req,
        @Res({ passthrough: true }) response: Response

    ): Promise<any> {

        return await this.authService.generateToken(req, response);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<any> {

        return req.user;
    }
}
