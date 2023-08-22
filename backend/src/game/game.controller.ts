import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
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
