import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: JwtService,
          useValue: {
            sign() {
              return 'signed';
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', () => {
    expect(service.getAll().length).toBe(3);
  });

  it('should return a users', () => {
    expect(service.getOne(1).email).toBe('aurelien@loyer.fr');
  });

  describe('login', () => {
    it('should return undefined', async done => {
      const payload = await service.login({
        email: 'aurelien2@loyer.fr',
        password: 'beer',
      });
      expect(payload).toBeUndefined();
      done();
    });

    it('should return the JWT token info', async done => {
      const payload = await service.login({
        email: 'aurelien@loyer.fr',
        password: 'beer',
      });
      expect(payload).toEqual({
        accessToken: 'Bearer signed',
        expiresIn: 3600,
      });
      done();
    });
  });

  describe('validate user', () => {
    it('should return a user', async done => {
      const user = await service.validateUser({
        email: 'aurelien@loyer.fr',
        password: 'beer',
      });
      expect(user).toEqual({
        cart: {},
        email: 'aurelien@loyer.fr',
        id: 1,
        password: 'beer',
        username: 'Aurel',
      });
      done();
    });

    it('should return undefind if the user does not exist', async done => {
      const user = await service.validateUser({
        email: 'aurelien2@loyer.fr',
        password: 'beer',
      });
      expect(user).toBeUndefined();
      done();
    });
  });
});
