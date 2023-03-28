import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ConflictException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ConflictException)
export class RegisterConflict implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const err = exception.getResponse();
    let msg = exception['response']['message'];
    let ar = [...msg];
   console.log("ststus cod eis ====================?>",status);
   
    return response
      .status(500)
      .render('register', { msg: ar  });
  }
}
 