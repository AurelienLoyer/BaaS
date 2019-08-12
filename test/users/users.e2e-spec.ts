import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { UserDto } from '../../src/users/user.dto';
import { UsersService } from '../../src/users/users.service';

describe('Users', () => {
  class MockUserService extends UsersService {
    getAll() {
      return [{ id: 1, email: 'email', password: 'string', cart: null }];
    }
    login(user: UserDto) {
      return Promise.resolve(
        user.email === 'ok'
          ? {
              expiresIn: 3600,
              accessToken: `Bearer`,
            }
          : undefined,
      );
    }
  }

  let app: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useClass(MockUserService)
      .compile();

    app = module.createNestApplication();
    usersService = module.get(UsersService);
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(200)
      .expect(usersService.getAll());
  });

  it(`/POST login should throw an error`, () => {
    return request(app.getHttpServer())
      .post('/api/v1/users/login')
      .send({})
      .expect(404);
  });

  it(`/POST login should return the token`, () => {
    return request(app.getHttpServer())
      .post('/api/v1/users/login')
      .send({ email: 'ok' })
      .expect(201);
  });

  it(`/GET info should return 401 if the user is not loggedin`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/users/info')
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
