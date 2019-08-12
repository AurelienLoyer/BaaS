import { Test, TestingModule } from '@nestjs/testing';
import { ExtensionValidator } from './extension.validator';

describe('ExtensionValidator', () => {
  let validator: ExtensionValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtensionValidator],
    }).compile();

    validator = module.get<ExtensionValidator>(ExtensionValidator);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  it('should return all beers', () => {
    expect(validator.validate('test.png')).toBeTruthy();
  });

  it('should return the beer with the id 2', () => {
    expect(validator.validate('test.text')).toBeFalsy();
  });
});
