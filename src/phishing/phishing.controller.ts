import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PhishingService } from './phishing.service';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  async send(@Body() body: { to: string; subject: string; body: string }) {
    return await this.phishingService.sendEmail(body.to, body.subject, body.body);
  }
}

@Controller('track')
export class TrackController {
  constructor(private readonly phishingService: PhishingService) {}
  
  @Get('click')
  async trackClick(@Query('token') token: string, @Res() res: Response) {
    await this.phishingService.markClicked(token);
    console.log(`Tracking click for token: ${token}`);

    // Example: Log in DB here
  }
}