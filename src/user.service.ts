import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(id: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: id,
    });
  }
}
