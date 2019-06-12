import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('Users Controller', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return hello world', () => {
    expect(controller.root()).toEqual({ message: 'Hello world ! 🦄' });
  });

  // it('should call the sendFile method of the HTTP Response', () => {
  //   const response = {
  //     sendFile: jest.fn(),
  //   };

  //   controller.test('nestjs.png', response);
  //   expect(response.sendFile).toHaveBeenCalledWith('img/nestjs.png', {
  //     root: 'static',
  //   });
  // });
});
