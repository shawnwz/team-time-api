import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  // @Get('users')
  // async getAllUsers(): Promise<UserModel[]> {
  //   return this.prismaService.user.findMany();
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('user/id/:id')
  // async getUserById(@Param('id') id: string): Promise<UserModel> {
  //   return this.userService.findUser(id);
  // }

  // @Get('user/uid/:uid')
  // async getUserByUId(@Param('uid') uid: string): Promise<UserModel> {
  //   return this.prismaService.user.findUnique({
  //     where: { uid: String(uid) },
  //   });
  // }

  // @Get('user/:email')
  // async getUserByEmail(@Param('email') email: string): Promise<UserModel> {
  //   return this.prismaService.user.findUnique({
  //     where: { email: String(email) },
  //   });
  // }

  // @Post('user')
  // async createUser(@Body() user: CreateUserDto): Promise<UserModel> {
  //   return this.userService.createUser(user);
  // }
}
