import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @Get('user/id/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });
  }

  @Get('user/uid/:uid')
  async getUserByUId(@Param('uid') uid: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: { uid: String(uid) },
    });
  }

  @Get('user/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: { email: String(email) },
    });
  }
}
