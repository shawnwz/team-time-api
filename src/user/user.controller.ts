import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get() {}
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard)
  @Get('id/:id')
  async getUserById(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<UserModel> {
    return this.userService.findUser(id);
  }
}
