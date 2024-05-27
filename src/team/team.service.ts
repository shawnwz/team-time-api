import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Team } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  // async findTeamById(id: string): Promise<Team | null> {
  //   return this.prisma.team.findUnique({
  //     where: { id: id },
  //     include: { users: true },
  //   });
  // }

  async findTeamByName(name: string): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { name: name },
      include: {
        users: {
          include: { user: true },
        },
      },
    });
  }

  async isTeamExistByName(name: string): Promise<boolean> {
    return this.prisma.team
      .findMany({
        where: {
          name: name,
        },
      })
      .then((t) => t.length > 0);
  }

  async createTeam(team: CreateTeamDto, uid: string): Promise<Team | null> {
    return this.prisma.team.create({
      data: {
        name: team.name,
        description: team.description,
        users: {
          create: [
            {
              user: {
                connect: {
                  id: uid,
                },
              },
            },
          ],
        },
      },
    });
  }

  async joinTeam(teamName: string, uid: string) {
    console.log(`going to join team ${teamName}, user ${uid}`);
    const team_user = await this.prisma.teams_Users.findUnique({
      where: {
        user_id_team_name: {
          user_id: uid,
          team_name: teamName,
        },
      },
    });
    console.log(team_user);
    if (!team_user) {
      console.log('lets go');
      await this.prisma.teams_Users.create({
        data: {
          user_id: uid,
          team_name: teamName,
        },
      });
      return this.findTeamByName(teamName);
    }
  }
}
