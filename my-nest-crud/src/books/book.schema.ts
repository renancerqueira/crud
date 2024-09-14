import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
})
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
