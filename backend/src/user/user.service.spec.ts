import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, SchemaTypes } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;

  const mockUserModel = {
    create: jest.fn(),
  };

  const createUserDto: CreateUserDto = {
    name: 'player1',
    image: 'profile.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createdUser = {
      _id: new SchemaTypes.ObjectId('1'),
      ...createUserDto,
    };

    mockUserModel.create.mockResolvedValue(createdUser);

    const result = await service.create(createUserDto);

    expect(result).toEqual(createdUser);
    expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
  });
});
