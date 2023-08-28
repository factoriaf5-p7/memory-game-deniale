import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import mongoose from 'mongoose';
import { UserModule } from '../src/user/user.module';
import { getModelToken } from '@nestjs/mongoose';

describe('User (e2e)', () => {
  let app: INestApplication;
  const mockUserModel = {
    create: jest.fn()
    .mockImplementation((createUserDto: CreateUserDto) => {
      return {
        _id: new mongoose.Types.ObjectId(),
        ...createUserDto,
      };
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).overrideProvider(getModelToken('User'))
    .useValue(mockUserModel).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });



  it('/user (POST)', async () => {
    const createUserDto = {
      name: 'player1',
      image: 'profile.jpg',
    };

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(201); 

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toMatchObject({
      _id: expect.any(String),
    });
    expect(response.body.image).toBe(createUserDto.image);
  });

  afterAll(async () => {
    await app.close();
  });
});