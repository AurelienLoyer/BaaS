import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

describe('UsersService', () => {
  let service: JwtStrategy;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UsersService,
          useValue: {
            validateUser(payload) {
              return payload.email === '1@1.com';
            },
          },
        },
      ],
    }).compile();

    service = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user', () => {
    expect(service.validate({ email: '1@1.com', password: '' })).toBeTruthy();
  });

  it('should throw an exception', async done => {
    try {
      await service.validate({ email: '2@1.com', password: '' });
    } catch (e) {
      expect(e.message.error).toEqual('Unauthorized');
      done();
    }
  });
});
