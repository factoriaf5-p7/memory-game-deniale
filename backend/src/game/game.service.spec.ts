import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Game } from './schemas/game.schema';
import { ObjectId, SchemaTypes } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const games: Array<{ _id: ObjectId } & Game> = [
  {
    _id: new SchemaTypes.ObjectId('1'),
    name: 'superman',
    url: 'www.example.com',
    category: "superhero"
  },
];

describe('GameService', () => {
  let service: GameService;
  const mockGameModel = {
    find: jest.fn(),
    findById: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService,
        {
          provide: getModelToken(Game.name),
          useValue: mockGameModel,
        },],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all games', async () => {
    mockGameModel.find.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(games) });

    const result = await service.findAll();

    expect(result).toEqual(games);
    expect(mockGameModel.find).toHaveBeenCalledWith({});
  });

  it('should return games filtered by category', async () => {
    const category = 'superhero';
    const filteredGames = games[0]
    mockGameModel.find.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(filteredGames) });

    const result = await service.findAll(category);

    expect(result).toEqual(filteredGames);
    expect(mockGameModel.find).toHaveBeenCalledWith({ category });
  });

  it('findOne() should return a game by ID', async () => {
    const gameId = new SchemaTypes.ObjectId('1');
    const expectedGame = games[0];

    mockGameModel.findById.mockResolvedValueOnce(expectedGame);

    const result = await service.findOne(gameId);
    expect(result).toEqual(expectedGame);
  });
});
