import { Test, TestingModule } from '@nestjs/testing';
import { AmbassadeurController } from './ambassadeur.controller';
import { AmbassadeurService } from './ambassadeur.service';

describe('AmbassadeurController', () => {
  let controller: AmbassadeurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmbassadeurController],
      providers: [AmbassadeurService],
    }).compile();

    controller = module.get<AmbassadeurController>(AmbassadeurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
