import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchesService } from './matches.service';
import { Match } from './match.entity';

describe('MatchesService', () => {
  let matchesService: MatchesService;
  let matchesRepository: Repository<Match>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        {
          provide: getRepositoryToken(Match),
          useClass: Repository,
        },
      ],
    }).compile();

    matchesService = module.get(MatchesService);
    matchesRepository = module.get(getRepositoryToken(Match));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of matches', async () => {
      const matches = [new Match(), new Match()];
      jest.spyOn(matchesRepository, 'find').mockResolvedValue(matches);

      const result = await matchesService.findAll();

      expect(result).toBe(matches);
      expect(matchesRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a match', async () => {
      const match = new Match();
      jest.spyOn(matchesRepository, 'findOneBy').mockResolvedValue(match);

      const result = await matchesService.findOne(1);

      expect(result).toBe(match);
      expect(matchesRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create a match', async () => {
      const match = new Match();
      jest.spyOn(matchesRepository, 'create').mockReturnValue(match);
      jest.spyOn(matchesRepository, 'save').mockResolvedValue(match);

      const result = await matchesService.create(match);

      expect(result).toBe(match);
      expect(matchesRepository.create).toHaveBeenCalledWith(match);
      expect(matchesRepository.save).toHaveBeenCalledWith(match);
    });
  });

  describe('update', () => {
    it('should update a match', async () => {
      const match = new Match();
      jest.spyOn(matchesRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(matchesRepository, 'findOneBy').mockResolvedValue(match);

      const result = await matchesService.update(1, match);

      expect(result).toBe(match);
      expect(matchesRepository.update).toHaveBeenCalledWith(1, match);
      expect(matchesRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('delete', () => {
    it('should delete a match', async () => {
      jest.spyOn(matchesRepository, 'delete').mockResolvedValue(undefined);

      await matchesService.delete(1);

      expect(matchesRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
