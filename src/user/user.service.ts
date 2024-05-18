import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        teams: {
          include: { team: true },
        },
      },
    });
  }

  async createUser(user: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        uid: uuidv4(),
        email: user.email,
        name: user.name,
        country: user.country,
        timezone: user.timezone,
        teams: {
          create: [
            {
              team: {
                connectOrCreate: {
                  where: {
                    id: 1,
                  },
                  create: {
                    id: 1,
                    name: 'test team',
                  },
                },
              },
            },
          ],
        },
      },
    });
  }
}
