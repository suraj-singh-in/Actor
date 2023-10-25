import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Act {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  isGlobal: boolean;

  @Prop({ required: true })
  author: string;

  @Prop()
  currentVerse: string;
}

export const ActSchema = SchemaFactory.createForClass(Act);
