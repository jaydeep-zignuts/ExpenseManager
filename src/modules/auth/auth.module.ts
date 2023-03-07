import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../users/user.service';
import { AccountService } from '../accounts/accounts.service';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'secret',
    signOptions: {
      expiresIn: '1d'
    },
  }),
],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})

export class AuthModule {}
