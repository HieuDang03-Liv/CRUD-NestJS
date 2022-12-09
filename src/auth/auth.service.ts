import { UsersService } from './../app/users/users.service'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findUserLogin({ username, password })
      if (user) {
        const dataPassword = user.password
        const isMatchedPassword = await compare(password, dataPassword)
        if (isMatchedPassword) {
          const { password, ...data } = user
          return data
        }
      }
    } catch (err) {
      return null
    }
  }

  async login(user: any) {
    const payload = { username: user.username }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
