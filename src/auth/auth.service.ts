import { UsersService } from './../app/users/users.service';
import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserLogin({ username, password })
    if (user) {
      const password = user.password

    }
    return null
  }
}
