import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ClickToken extends Document {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: false })
  clicked: boolean;

  @Prop({ type: Date })
  clickedAt: Date;
}

export const ClickTokenSchema = SchemaFactory.createForClass(ClickToken);
