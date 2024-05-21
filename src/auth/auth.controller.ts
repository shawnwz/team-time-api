import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async loginGithub() {
    console.log(`login with github`);
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async authGithubCallback(@Req() req, @Res() resp) {
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
    resp.cookie('jwt', jwt);
    resp.redirect(`http://localhost:5173`);
    //return { accessToken: this.jwtService.sign(payload) };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle() {
    console.log(`login with google`);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async authGoogleCallback(@Req() req, @Res() resp) {
    const user = req.user;
    console.log(user);
    const user_to_be_created: CreateUserDto = {
      email: user.email,
      name: user.name,
      photo: user.picture,
      country: '',
      timezone: '',
      provider: user.provider,
      provider_account_id: user.providerId,
    };
    const jwt = this.authService.getOrCreateUser(user_to_be_created);
    resp.cookie('jwt', jwt);
    resp.redirect(`http://localhost:5173`);
  }

  // @Get('google/userData')
  // async getGoogleUserData(
  //   @Query('accessToken') accessToken: string,
  // ): Promise<any> {
  //   const data = await this.authService.getGoogleUserData(accessToken);
  //   return data;
  // }
}
