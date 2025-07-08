import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { ClickToken, ClickTokenSchema } from './schemas/click-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClickToken.name, schema: ClickTokenSchema },
    ]),
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}