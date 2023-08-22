import mongoose, { HydratedDocument, Schema as MongooseSchema, Types, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<Game>;

@Schema()
export class Game {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    url: string;

    @Prop({required: true})
    category: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
