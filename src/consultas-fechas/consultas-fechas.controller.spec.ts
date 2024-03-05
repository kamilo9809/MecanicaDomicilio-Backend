import { Test, TestingModule } from '@nestjs/testing';
import { ConsultasFechasController } from './consultas-fechas.controller';

describe('ConsultasFechasController', () => {
  let controller: ConsultasFechasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultasFechasController],
    }).compile();

    controller = module.get<ConsultasFechasController>(ConsultasFechasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
