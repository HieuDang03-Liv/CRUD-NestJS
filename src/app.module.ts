import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { DateDataModule } from './app/date-data/date-data.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION, {
      dbName: 'our-site'
    }),
    DateDataModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
