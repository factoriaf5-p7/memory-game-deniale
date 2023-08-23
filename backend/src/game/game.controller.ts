import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { ObjectId } from 'mongoose';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}


  @Get()
  async findAll(@Query('category') category?: string) {
    return await this.gameService.findAll(category);
  }

   @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return await this.gameService.findOne(id);
  } 

}
