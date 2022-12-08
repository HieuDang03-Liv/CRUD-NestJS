import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { DetailContent } from './date-data.dto'

export type DateDataDocument = HydratedDocument<DateData>

@Schema()
export class DateData {
  @Prop({ required: true })
  author: string

  @Prop()
  userId: string

  @Prop({ required: true })
  dateTime: Date

  @Prop({ type: Object })
  detailContent: object
}

export const DateDateSchema = SchemaFactory.createForClass(DateData)
