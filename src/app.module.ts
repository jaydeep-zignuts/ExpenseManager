import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { TransactionModule } from './modules/transaction/transaction.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpUnauthorizedExceptionFiletr } from './exceptions/httpUnauthorizedException.filter';
import { JwtAuthMiddleware } from './middleware/jwtAuth.middleware';
import { TransactionController } from './modules/transaction/transaction.controller';


@Module({
  imports: [
    forwardRef( ()=> UsersModule ), 
    forwardRef( ()=> AccountsModule ),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    }),
    EventEmitterModule.forRoot(),
    forwardRef( ()=> TransactionModule ),
    forwardRef(()=> AuthModule)
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}