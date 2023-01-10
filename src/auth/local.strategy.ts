import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { WRONG_CREDENTIAL_MSG } from 'src/app/common/constants'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException(WRONG_CREDENTIAL_MSG)
    }
    return user
  }
}
