import { Test, TestingModule } from '@nestjs/testing';
import { ActsService } from './acts.service';

describe('ActsService', () => {
  let service: ActsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActsService],
    }).compile();

    service = module.get<ActsService>(ActsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
