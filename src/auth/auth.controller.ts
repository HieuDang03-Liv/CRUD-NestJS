import { Controller, UseGuards, Post, Body } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'
import { RenewAccessToken, UserLogIn } from 'src/app/users/users.dto'
import { JwtRefreshTokenGuard } from './refresh-token.guard'

@Controller('auth')
export class AuthController {
  constructor(private authServire: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() reqBody: UserLogIn) {
    return this.authServire.login(reqBody.username)
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh_token')
  renewRefreshToken(@Body() reqBody: RenewAccessToken) {
    return this.authServire.renewToken(reqBody)
  }
}
