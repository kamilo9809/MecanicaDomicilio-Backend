import { Test, TestingModule } from '@nestjs/testing';
import { ConsultasFechasService } from './consultas-fechas.service';

describe('ConsultasFechasService', () => {
  let service: ConsultasFechasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultasFechasService],
    }).compile();

    service = module.get<ConsultasFechasService>(ConsultasFechasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
