import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }
}
