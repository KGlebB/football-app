import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { TeamsService } from './teams.service';

describe('TeamsController', () => {
  let teamsController: TeamsController;
  let teamsService: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
      ],
    }).compile();

    teamsController = module.get(TeamsController);
    teamsService = module.get(TeamsService);
  });

  it('should be defined', () => {
    expect(teamsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of teams', async () => {
      const result: Team[] = [
        { id: 1, name: 'Zenit' },
        { id: 2, name: 'Spartak' },
      ];
      jest
        .spyOn(teamsService, 'findAll')
        .mockImplementation(async () => result);
      expect(await teamsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a team', async () => {
      const result: Team = { id: 1, name: 'Zenit' };
      jest
        .spyOn(teamsService, 'findOne')
        .mockImplementation(async () => result);
      expect(await teamsController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a team', async () => {
      const result: Team = { id: 1, name: 'Zenit' };
      const team: Team = { name: 'Zenit' };
      jest.spyOn(teamsService, 'create').mockImplementation(async () => result);
      expect(await teamsController.create(team)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a team', async () => {
      const result: Team = { id: 1, name: 'Zenit' };
      const team: Team = { name: 'Zenit' };
      jest.spyOn(teamsService, 'update').mockImplementation(async () => result);
      expect(await teamsController.update(1, team)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a team', async () => {
      jest
        .spyOn(teamsService, 'delete')
        .mockImplementation(async () => undefined);
      expect(await teamsController.delete(1)).toBe(undefined);
    });
  });
});
