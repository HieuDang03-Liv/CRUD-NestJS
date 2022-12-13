import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from 'src/app/users/users.module'
import { RefreshTokenStrategy } from './refresh-token.strategy'

@Module({
  imports: [PassportModule, UsersModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
