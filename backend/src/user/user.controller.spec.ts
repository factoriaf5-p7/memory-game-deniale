import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SchemaTypes } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

const user = {
  _id: new SchemaTypes.ObjectId('1'),
  name: "player1"
}

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = {
    create: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'player1',
      image: 'profile.jpg',
    };

    const createdUser = {
      _id: '1', 
      ...createUserDto,
    };

    mockUserService.create.mockResolvedValue(createdUser);

    const result = await controller.create(createUserDto);

    expect(result).toEqual(createdUser);
    expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
  });
});
