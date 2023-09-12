import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Game } from './schemas/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async findAll(category?: string) {
    const query = category ? { category } : {}; 
    
    return await this.gameModel.find(query).exec();
  }

  async findOne(id: ObjectId) {
    return await this.gameModel.findById(id);
  }
}
