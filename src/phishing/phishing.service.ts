import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClickToken } from './schemas/click-token.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PhishingService {
  private transporter;

  constructor(
    @InjectModel(ClickToken.name)
    private readonly clickTokenModel: Model<ClickToken>,
  ) {
    // Set up transporter with your email credentials
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Or another provider like 'hotmail', 'yahoo', or use custom SMTP
      auth: {
        user: 'your.email@gmail.com',
        pass: 'your-app-password', // Use an app-specific password for Gmail
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    // const uniqueToken = uuidv4();
    const uniqueToken = 'my-token';
    const trackingUrl = `http://localhost:3000/track/click?token=${uniqueToken}`;
    const mailOptions = {
        from: '"My App" <your.email@gmail.com>',
        to,
        subject,
        text: `Click here: ${trackingUrl}`, 
        html: `
            <p>Please click the button below:</p>
            <p><a href="${trackingUrl}" target="_blank">Click Here</a></p>
        `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async markClicked(token: string): Promise<void> {
    const record = await this.clickTokenModel.findOne({ token });

    if (record && !record.clicked) {
      record.clicked = true;
      record.clickedAt = new Date();
      await record.save();
    }
  }

  async createToken(email: string, token: string) {
    return this.clickTokenModel.create({
      email,
      token,
    });
  }
}