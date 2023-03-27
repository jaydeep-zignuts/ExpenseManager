import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
 
@Catch(UnauthorizedException)
export class LoginUnauthorized implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const err = exception.getResponse();
    let msg = exception['response']['message'];
    console.log(err);
    
    return response
      .status(400)
      .render('login', { msg:'Invalid username or password'  });
  }
}