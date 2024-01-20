import { Test, TestingModule } from '@nestjs/testing';
import { ExemplaeController } from './example.controller';

describe('ExemplaeController', () => {
  let controller: ExemplaeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExemplaeController],
    }).compile();

    controller = module.get<ExemplaeController>(ExemplaeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
