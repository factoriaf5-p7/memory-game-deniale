import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ObjectId } from 'mongoose';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}


  @Get()
 async findAll() {
    return await this.gameService.findAll();
  }

   @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return await this.gameService.findOne(id);
  } 

}
