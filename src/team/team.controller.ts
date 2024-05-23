import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';
import { AuthGuard } from '../auth/auth.guard';
import { TeamExistException } from '../exceptions/TeamExistException';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/:name')
  async getTeamByName(@Param('name') name: string): Promise<Team> {
    return this.teamService.findTeamByName(name);
  }

  @Get('/check/:name')
  async checkTeamExistByName(@Param('name') name: string): Promise<boolean> {
    return this.teamService.isTeamExistByName(name);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createTeam(@Req() req, @Body() dto: CreateTeamDto) {
    console.log(req.user);
    if (await this.teamService.isTeamExistByName(dto.name)) {
      throw new TeamExistException(
        `Team name ${dto.name} is taken, try another`,
      );
    }
    return this.teamService.createTeam(dto);
  }
}
