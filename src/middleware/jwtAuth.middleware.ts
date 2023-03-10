import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("JWT AUTH IS ", req.cookies['jwt']);
    
    if(req.cookies['jwt']){
        return req.cookies['jwt'];
    }else{
        throw new UnauthorizedException();
        // return res.json({
        //     msg: "U are anauthorized"
        // })

    };

    next();
  }
}
