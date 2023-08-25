import mongoose, { HydratedDocument, Schema as MongooseSchema, Types, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    name: string;

    @Prop()
    image: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
