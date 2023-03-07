import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from 'express';
@Catch(UnauthorizedException)
export class HttpUnauthorizedExceptionFiletr implements ExceptionFilter{
     catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        return  response.status(401).render('404');
    }

}