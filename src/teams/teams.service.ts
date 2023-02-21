import { Injectable } from '@nestjs/common';
import { Team } from './team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

  public async findAll(): Promise<Team[]> {
    return this.teamsRepository.find();
  }

  public async findOne(id: number): Promise<Team> {
    return this.teamsRepository.findOneBy({ id });
  }

  public async create(team: Team): Promise<Team> {
    return this.teamsRepository.save(this.teamsRepository.create(team));
  }

  public async update(id: number, team: Team): Promise<Team> {
    await this.teamsRepository.update(id, team);
    return this.teamsRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<void> {
    await this.teamsRepository.delete(id);
  }
}
