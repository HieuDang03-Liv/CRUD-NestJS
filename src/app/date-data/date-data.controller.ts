import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { DataOnDayReqBody, FindDataOnDay } from './date-data.dto'
import { DateDataService } from './date-data.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('date-data')
export class DateDataController {
  constructor(private dateDataService: DateDataService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createDateData(@Body() bodyReq: DataOnDayReqBody): Promise<string> {
    const result = await this.dateDataService.createDateData(bodyReq)
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getAllData(@Body() bodyReq: FindDataOnDay): Promise<any> {
    const result = await this.dateDataService.getAllData(bodyReq)
    return result
  }
}
