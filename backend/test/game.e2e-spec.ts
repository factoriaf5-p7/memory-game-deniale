import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Game } from 'src/game/schemas/game.schema';
import { GameModule } from '../src/game/game.module';
import { GameService } from 'src/game/game.service';
const games:  Array<{ _id: mongoose.Types.ObjectId } & Game> = [
    {
      _id: new mongoose.Types.ObjectId('64e3dd89f60d71c3f642eb73'),
      name: 'thor',
      url: 'https://res.cloudinary.com/dqlu4lleo/image/upload/v1692624731/superhero-game/rw0z9tbtfdjkr5ht5u1m.jpg',
      category: "superhero"
    },
  ];
  

describe('Game (e2e)', () => {
  let app: INestApplication;
  const mockGameModel = {
    find: jest.fn().mockImplementationOnce(() => ({
      exec: jest.fn().mockResolvedValue({ games }),
    })),
    findById: jest.fn().mockResolvedValue(games[0]),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GameModule],
    })
      .overrideProvider(getModelToken('Game'))
      .useValue(mockGameModel)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/game (GET)', async () => {
   const response = await request(app.getHttpServer()).get('/game');

    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body.games)).toBe(
      JSON.stringify(games),
 ) });
 
 it('/game/:id (GET)', async () => {
  const gameId = '64e3dd89f60d71c3f642eb73';

  const response = await request(app.getHttpServer()).get(`/game/${gameId}`);

  const responseGame = response.body;
  responseGame._id = new mongoose.Types.ObjectId(responseGame._id);

  expect(response.statusCode).toBe(HttpStatus.OK);
  expect(responseGame).toEqual(games[0]);
});

  afterAll(async () => app.close());

});