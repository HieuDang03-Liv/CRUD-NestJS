import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { UserData, UserLogIn } from './users.dto'
import { User, UserDocument } from './users.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canFindUserId(userId: string): Promise<boolean> {
    const foundUser = await this.findUserByProps({ _id: userId })
    if (foundUser) {
      return true
    }
    return false
  }

  async findUserLogin(login: UserLogIn): Promise<UserData> {
    const foundUser = await this.findUserByProps({ username: login.username })
    return foundUser
  }

  async findUserByProps(props: Object): Promise<UserData> {
    //convert id from string to ObjectId of MongoDB
    if (props['_id']) {
      props['_id'] = new Types.ObjectId(props['_id'])
    }
    const foundUser = await this.userModel.findOne({ ...props })
    if (foundUser) {
      return foundUser
    }
    return null
  }
}
