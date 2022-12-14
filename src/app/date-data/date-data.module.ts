import { Module, Global } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../users/users.schema'
import { UsersService } from '../users/users.service'
import { DateDataController } from './date-data.controller'
import { DateDateSchema, DateData } from './date-data.schema'
import { DateDataService } from './date-data.service'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: DateData.name, schema: DateDateSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [DateDataController],
  providers: [DateDataService, UsersService]
})
export class DateDataModule {}
