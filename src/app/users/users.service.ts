import { Injectable } from '@nestjs/common'
import { UserData, UserLogIn } from './users.dto'

@Injectable()
export class UsersService {
  constructor() {}

  findUser(userLogin: UserLogIn): UserLogIn {
    return
  }
}
