import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Team } from './team.entity';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  public async findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Team> {
    return this.teamsService.findOne(id);
  }

  @Post()
  public async create(@Body() team: Team) {
    return this.teamsService.create(team);
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() team: Team,
  ): Promise<Team> {
    return this.teamsService.update(id, team);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<void> {
    return this.teamsService.delete(id);
  }
}
