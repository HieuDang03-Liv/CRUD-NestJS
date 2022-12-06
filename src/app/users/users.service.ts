import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserData, UserLogIn } from './users.dto'
import { User, UserDocument } from './users.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findUser(userId: string): Promise<boolean> {
    const foundUser = await this.userModel.findById(userId)
    if (foundUser) {
      return true
    }
    return false
  }
}
