import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateTeamDto } from '../team/dto/create-team.dto';
import { UpdateTzDto } from './dto/update-tz.dto';

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

  @Post('/timezone')
  @UseGuards(AuthGuard)
  async updateTimezone(
    @Req() req,
    @Body() dto: UpdateTzDto,
  ): Promise<UserModel> {
    return this.userService.updateTimeZone(req.user.sub, dto.timezone);
  }
}
