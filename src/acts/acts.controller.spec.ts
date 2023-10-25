import { Test, TestingModule } from '@nestjs/testing';
import { ActsController } from './acts.controller';
import { ActsService } from './acts.service';

describe('ActsController', () => {
  let controller: ActsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActsController],
      providers: [ActsService],
    }).compile();

    controller = module.get<ActsController>(ActsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
