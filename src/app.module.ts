import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhishingModule } from './phishing/phishing.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestdb'),
    PhishingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}