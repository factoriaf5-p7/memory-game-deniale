import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common'
import { GameService } from './game.service'
import { ObjectId } from 'mongoose'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}


  @Get()
  async findAll(@Query('category') category?: string) {
    const games = await this.gameService.findAll(category);
    
    if (!games.length && category) {
      throw new NotFoundException(`No games found for category: ${category}`);
    }
    
    return games;
  }

   @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return await this.gameService.findOne(id);
  } 

}
