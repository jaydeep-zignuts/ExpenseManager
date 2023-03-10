import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs'
import { HttpUnauthorizedExceptionFiletr } from './exceptions/httpUnauthorizedException.filter';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, );
  await app.use(cookieParser());
  await app.enableCors({
    origin:'http://localhost:3000',
    credentials: true
  }) 

  app.setViewEngine('hbs');
  
  app.useStaticAssets(join(__dirname, '../src/' ,'assets'));
  app.setBaseViewsDir(join(__dirname,'../src/', 'views'));
  //  (join(__dirname, '../src/','partials'));
  
  hbs.registerHelper('if_equals', function(a, b, opts) {
    if (a !== b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
  });

  hbs.registerHelper('date', function(date) {
    const day = new Date(date).getDate();
    const month= new Date(date).getMonth()+1;
    const year = new Date(date).getFullYear();

    return day + '-' + month+ '-'+ year;
  });

  app.useGlobalFilters(new HttpUnauthorizedExceptionFiletr());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
