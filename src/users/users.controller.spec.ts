import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            login(user) {
              return user.email === '1@1@gmail.com'
                ? Promise.resolve('good_token')
                : Promise.resolve(undefined);
            },
            getAll() {
              return [{ id: 1 }, { id: 2 }];
            },
          },
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', () => {
      expect(controller.findAll()).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });

  describe('login', () => {
    it('should return the token of an user', async done => {
      const token = await controller.login({
        email: '1@1@gmail.com',
        password: '',
      });
      expect(token).toEqual('good_token');
      done();
    });

    it('should throw an error', async done => {
      try {
        const token = await controller.login({
          email: '2@1@gmail.com',
          password: '',
        });
      } catch (e) {
        expect(e.message).toBe('User not found');
        done();
      }
    });
  });

  describe('getUserInfo', () => {
    it('should return the information of an user', () => {
      expect(controller.getUserInfo({ user: { name: 'NestJS' } })).toEqual({
        name: 'NestJS',
        password: '******',
      });
    });
  });
});
