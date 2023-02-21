import { Injectable } from '@nestjs/common';
import { Match } from './match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
  ) {}

  public async findAll(): Promise<Match[]> {
    return this.matchesRepository.find();
  }

  public async findOne(id: number): Promise<Match> {
    return this.matchesRepository.findOneBy({ id });
  }

  public async create(match: Match): Promise<Match> {
    return this.matchesRepository.save(this.matchesRepository.create(match));
  }

  public async update(id: number, match: Match): Promise<Match> {
    await this.matchesRepository.update(id, match);
    return this.matchesRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<void> {
    await this.matchesRepository.delete(id);
  }
}
