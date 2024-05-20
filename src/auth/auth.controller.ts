import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req, @Res() resp) {
    const user = req.user;
    console.log(user);
    const user_to_be_created: CreateUserDto = {
      email: user._json.email,
      name: user.username,
      photo: user.photos[0].value,
      country: '',
      timezone: '',
      provider: user.provider,
      provider_account_id: user.id,
    };
    console.log('user to be created', user_to_be_created.name);
    console.log(JSON.stringify(user_to_be_created));
    const jwt = this.authService.getOrCreateUser(user_to_be_created);
    resp.redirect(`http://localhost:5173/login/${jwt}`);
    //return { accessToken: this.jwtService.sign(payload) };
  }

  @Get('google/userData')
  async getGoogleUserData(
    @Query('accessToken') accessToken: string,
  ): Promise<any> {
    const data = await this.authService.getGoogleUserData(accessToken);
    return data;
  }
}
