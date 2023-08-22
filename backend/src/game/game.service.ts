import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Game } from './schemas/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async findAll() {
    return await this.gameModel.find().exec();
  }

  async findOne(id: ObjectId) {
    return await this.gameModel.findById(id);
  }
}
