import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { UsersService } from '../users/users.service'
import { DataOnDayReqBody, DataOnDay, FindDataOnDay } from './date-data.dto'
import { DateData, DateDataDocument } from './date-data.schema'

@Injectable()
export class DateDataService {
  constructor(
    @InjectModel(DateData.name) private dateDateModel: Model<DateDataDocument>,
    private userService: UsersService
  ) {}

  async createDateData(dateDataDTO: DataOnDayReqBody): Promise<any> {
    try {
      const userId = dateDataDTO.userId
      const foundUserId = await this.userService.findUser(userId)
      if (foundUserId) {
        await this.dateDateModel.create({
          author: dateDataDTO.author,
          dateTime: dateDataDTO.dateTime,
          detailContent: dateDataDTO.detailContent,
          userId
        })
        return { message: 'Created successfully!' }
      } else {
        return { message: 'Not found user.' }
      }
    } catch (err) {
      return { message: 'Error!' }
    }
  }

  async getAllData(getBody: FindDataOnDay): Promise<DataOnDay | any> {
    try {
      const foundUserID = await this.userService.findUser(getBody.userId)
      if (foundUserID) {
        const data = await this.dateDateModel.findOne({
          userId: new Types.ObjectId(getBody.userId),
          dateTime: new Date(getBody.dateTime).toISOString()
        })
        return {
          userId: data.userId,
          author: data.author,
          dateTime: data.dateTime,
          detailContent: data.detailContent
        }
      } else {
        return { message: 'Not found user.' }
      }
    } catch (err) {
      return { message: err.message }
    }
  }
}
