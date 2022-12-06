import { Body, Controller, Get, Post } from '@nestjs/common'
import { DataOnDayReqBody, FindDataOnDay } from './date-data.dto'
import { DateDataService } from './date-data.service'

@Controller('date-data')
export class DateDataController {
  constructor(private dateDataService: DateDataService) {}

  @Post('create')
  async createDateData(@Body() bodyReq: DataOnDayReqBody): Promise<string> {
    const result = await this.dateDataService.createDateData(bodyReq)
    return result
  }

  @Get('list')
  async getAllData(@Body() bodyReq: FindDataOnDay): Promise<any> {
    const result = await this.dateDataService.getAllData(bodyReq)
    return result
  }
}
