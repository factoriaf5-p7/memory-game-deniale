import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ObjectId, SchemaTypes } from 'mongoose';
import { Game } from './schemas/game.schema';


const games: Array<{ _id: ObjectId } & Game> = [
  {
    _id: new SchemaTypes.ObjectId('1'),
    name: 'superman',
    url: 'www.example.com',
    category: "superhero"
  },
];

describe('GameController', () => {
  let controller: GameController;
  const mockGameService = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve({ games })),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).overrideProvider(GameService)
    .useValue(mockGameService).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all the game cards', async () => {
    expect(await controller.findAll()).toMatchObject({ games });
  });
  it('should return a game card by ID', async () => {
    const gameId =  new SchemaTypes.ObjectId('1');
    const expectedGame = {
      _id: gameId,
      name: 'superman',
      url: 'www.example.com',
      category: 'superhero',
    };

    mockGameService.findOne.mockResolvedValueOnce(expectedGame);

    const response = await controller.findOne(gameId);
    expect(response).toEqual(expectedGame);
  });

});
