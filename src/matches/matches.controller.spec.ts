import { Test, TestingModule } from '@nestjs/testing';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';

describe('MatchesController', () => {
  let matchesController: MatchesController;
  let matchesService: MatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchesController],
      providers: [
        MatchesService,
        {
          provide: getRepositoryToken(Match),
          useClass: Repository,
        },
      ],
    }).compile();

    matchesController = module.get(MatchesController);
    matchesService = module.get(MatchesService);
  });

  it('should be defined', () => {
    expect(matchesController).toBeDefined();
  });

  const teams: any = [
    { id: 1, name: 'Zenit' },
    { id: 2, name: 'Spartak' },
  ];

  describe('findAll', () => {
    it('should return an array of matches', async () => {
      const result: Match[] = [
        {
          id: 1,
          homeTeam: teams.at(0),
          awayTeam: teams.at(1),
          homeTeamScore: 3,
          awayTeamScore: 1,
        },
        {
          id: 2,
          homeTeam: teams.at(1),
          awayTeam: teams.at(0),
          homeTeamScore: 2,
          awayTeamScore: 2,
        },
      ];
      jest
        .spyOn(matchesService, 'findAll')
        .mockImplementation(async () => result);
      expect(await matchesController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a match', async () => {
      const result: Match = {
        id: 1,
        homeTeam: teams.at(0),
        awayTeam: teams.at(1),
        homeTeamScore: 3,
        awayTeamScore: 1,
      };
      jest
        .spyOn(matchesService, 'findOne')
        .mockImplementation(async () => result);
      expect(await matchesController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a match', async () => {
      const result: Match = {
        id: 1,
        homeTeam: teams.at(0),
        awayTeam: teams.at(1),
        homeTeamScore: 3,
        awayTeamScore: 1,
      };
      const match: Match = {
        homeTeam: teams.at(0),
        awayTeam: teams.at(1),
        homeTeamScore: 3,
        awayTeamScore: 1,
      };
      jest
        .spyOn(matchesService, 'create')
        .mockImplementation(async () => result);
      expect(await matchesController.create(match)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a match', async () => {
      const result: Match = {
        id: 1,
        homeTeam: teams.at(0),
        awayTeam: teams.at(1),
        homeTeamScore: 3,
        awayTeamScore: 1,
      };
      const match: Match = {
        homeTeam: teams.at(0),
        awayTeam: teams.at(1),
        homeTeamScore: 3,
        awayTeamScore: 1,
      };
      jest
        .spyOn(matchesService, 'update')
        .mockImplementation(async () => result);
      expect(await matchesController.update(1, match)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a match', async () => {
      jest
        .spyOn(matchesService, 'delete')
        .mockImplementation(async () => undefined);
      expect(await matchesController.delete(1)).toBe(undefined);
    });
  });
});
