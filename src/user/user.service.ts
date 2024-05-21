import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: {
        teams: {
          include: { team: true },
        },
      },
    });
  }
  //
  // async createUser(user: CreateUserDto) {
  //   return this.prisma.user.create({
  //     data: {
  //       email: user.email,
  //       name: user.name,
  //       country: user.country,
  //       timezone: user.timezone,
  //       teams: {
  //         create: [
  //           {
  //             team: {
  //               connectOrCreate: {
  //                 where: {
  //                   id: 1,
  //                 },
  //                 create: {
  //                   id: 1,
  //                   name: 'test team',
  //                 },
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  // }
}
