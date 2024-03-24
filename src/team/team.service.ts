import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findTeamById(id: string): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { id: parseInt(id) },
      include: { users: true },
    });
  }

  async findTeamByName(name: string): Promise<any | null> {
    return this.prisma.team.findUnique({
      where: { name: name },
      include: {
        users: {
          include: { user: true },
        },
      },
    });
  }
}
