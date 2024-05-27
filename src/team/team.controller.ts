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
import { UserService } from '../user/user.service';
import { JoinTeamDto } from './dto/join-team.dto';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private userService: UserService,
  ) {}

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
    //const user = this.userService.findUser(req.user.uid);
    return this.teamService.createTeam(dto, req.user.sub);
  }

  @Post('/join')
  async joinTeam(@Req() req, @Body() dto: JoinTeamDto) {
    console.log(req.user);
    return await this.teamService.joinTeam(dto.teamName, dto.userId);
  }
}
