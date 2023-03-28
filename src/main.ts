import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs'
import { HttpUnauthorizedExceptionFiletr } from './exceptions/httpUnauthorizedException.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { doc } from 'prettier'; 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, );
  await app.use(cookieParser());
  await app.enableCors({
    origin:'http://localhost:3000',
    credentials: true  
  }) 

  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, "../src/", "/views/partials"));
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
  hbs.registerPartials(__dirname + '/views');

  hbs.registerHelper('date', function(date) {
    const day = new Date(date).getDate();
    const month= new Date(date).getMonth()+1;
    const year = new Date(date).getFullYear();

    return day + '-' + month+ '-'+ year;
  });

  // hbs.registerPartials(__dirname + '/views/partials');

  
  app.useGlobalFilters(new HttpUnauthorizedExceptionFiletr());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().setTitle("Expense Manager").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, document);
  await app.listen(3000);
}
bootstrap();
