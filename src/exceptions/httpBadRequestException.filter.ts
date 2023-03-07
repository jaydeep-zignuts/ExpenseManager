import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class HttpBadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();


    console.log("EXception ", exception.getResponse());
    const err = exception.getResponse();
   let msg = exception['response']['message'];
   console.log( msg, "msg");
   let ar = [...msg]
   console.log(ar);
   
      return response
          .status(400)
          .render('register', { msg: ar  })

  }
}