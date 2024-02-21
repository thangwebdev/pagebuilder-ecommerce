import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema({ collection: 'pages', timestamps: true })
class Page {
  @Prop({ type: String, unique: true, index: true })
  code: string;

  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  href: string;

  @Prop({ type: String })
  payload: string;
}
const PageSchema = SchemaFactory.createForClass(Page);
PageSchema.index({ name: 'text', code: 'text' }, { default_language: 'none' });

export { Page, PageSchema };
