import { Controller, Get, Param } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from '@prisma/client';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/:name')
  async getTeamByName(@Param('name') name: string): Promise<Team> {
    return this.teamService.findTeamByName(name);
  }
}
