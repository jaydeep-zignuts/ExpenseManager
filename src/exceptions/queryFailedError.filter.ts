import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from 'express';
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter{
     catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        console.log('exx', exception);
    
        return response.status(500).render('400', {msg: exception.message});
    }

}