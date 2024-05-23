import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Team } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findTeamById(id: string): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { id: parseInt(id) },
      include: { users: true },
    });
  }

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

  async createTeam(team: CreateTeamDto): Promise<Team | null> {
    return this.prisma.team.create({
      data: {
        name: team.name,
        description: team.description,
      },
    });
  }
}
