import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { DetailContent } from './date-data.dto'

export type DateDataDocument = HydratedDocument<DateData>

@Schema()
export class DateData {
  @Prop({ required: true })
  author: string

  @Prop({ required: true })
  dateTime: Date

  @Prop()
  detailContent: DetailContent
}

export const DateDateSchema = SchemaFactory.createForClass(DateData)
