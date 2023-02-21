import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';

describe('TeamsService', () => {
  let teamsService: TeamsService;
  let teamsRepository: Repository<Team>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
      ],
    }).compile();

    teamsService = module.get(TeamsService);
    teamsRepository = module.get(getRepositoryToken(Team));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of teams', async () => {
      const teams = [new Team(), new Team()];
      jest.spyOn(teamsRepository, 'find').mockResolvedValue(teams);

      const result = await teamsService.findAll();

      expect(result).toBe(teams);
      expect(teamsRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a team', async () => {
      const team = new Team();
      jest.spyOn(teamsRepository, 'findOneBy').mockResolvedValue(team);

      const result = await teamsService.findOne(1);

      expect(result).toBe(team);
      expect(teamsRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create a team', async () => {
      const team = new Team();
      jest.spyOn(teamsRepository, 'create').mockReturnValue(team);
      jest.spyOn(teamsRepository, 'save').mockResolvedValue(team);

      const result = await teamsService.create(team);

      expect(result).toBe(team);
      expect(teamsRepository.create).toHaveBeenCalledWith(team);
      expect(teamsRepository.save).toHaveBeenCalledWith(team);
    });
  });

  describe('update', () => {
    it('should update a team', async () => {
      const team = new Team();
      jest.spyOn(teamsRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(teamsRepository, 'findOneBy').mockResolvedValue(team);

      const result = await teamsService.update(1, team);

      expect(result).toBe(team);
      expect(teamsRepository.update).toHaveBeenCalledWith(1, team);
      expect(teamsRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('delete', () => {
    it('should delete a team', async () => {
      jest.spyOn(teamsRepository, 'delete').mockResolvedValue(undefined);

      await teamsService.delete(1);

      expect(teamsRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
