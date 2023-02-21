import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Match } from './match.entity';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  public async findAll(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Match> {
    return this.matchesService.findOne(id);
  }

  @Post()
  public async create(@Body() match: Match) {
    return this.matchesService.create(match);
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() match: Match,
  ): Promise<Match> {
    return this.matchesService.update(id, match);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<void> {
    return this.matchesService.delete(id);
  }
}
