import mongoose, { HydratedDocument, Types } from 'mongoose';
export type UserDocument = HydratedDocument<Game>;
export declare class Game {
    name: string;
    url: string;
    category: string;
}
export declare const GameSchema: mongoose.Schema<Game, mongoose.Model<Game, any, any, any, mongoose.Document<unknown, any, Game> & Game & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Game, mongoose.Document<unknown, {}, Game> & Game & {
    _id: Types.ObjectId;
}>;
