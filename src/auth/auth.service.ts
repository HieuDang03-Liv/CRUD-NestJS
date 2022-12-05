import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor() {}

  logIn(username: string, password: string): Promise<any> {
    return
  }
}
