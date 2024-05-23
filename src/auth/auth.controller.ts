import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async loginGithub() {}

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
    const [jwt, uid, userName] =
      await this.authService.getOrCreateUser(user_to_be_created);
    resp.cookie('jwt', jwt);
    resp.cookie('provider', 'github');
    resp.cookie('uid', uid);
    resp.cookie('userName', userName);
    resp.redirect(`http://localhost:5173`);
    //return { accessToken: this.jwtService.sign(payload) };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async authGoogleCallback(@Req() req, @Res() resp) {
    const user = req.user;
    const user_to_be_created: CreateUserDto = {
      email: user.email,
      name: user.name,
      photo: user.picture,
      country: '',
      timezone: '',
      provider: user.provider,
      provider_account_id: user.providerId,
    };
    const [jwt, uid, userName] =
      await this.authService.getOrCreateUser(user_to_be_created);
    resp.cookie('jwt', jwt);
    resp.cookie('provider', 'google');
    resp.cookie('uid', uid);
    resp.cookie('userName', userName);
    resp.redirect(`http://localhost:5173`);
  }

  // @Get('google/userData')
  // async getGoogleUserData(
  //   @Req() req,
  //   @Query('accessToken') accessToken: string,
  //   @Res() resp,
  // ): Promise<void> {
  //   const data = await this.authService.getGoogleUserData(accessToken);
  //   const user_to_be_created: CreateUserDto = {
  //     email: data.email,
  //     name: data.name,
  //     photo: data.picture,
  //     country: '',
  //     timezone: '',
  //     provider: 'google',
  //     provider_account_id: data.sub,
  //   };
  //   const [jwt, uid, name] =
  //     await this.authService.getOrCreateUser(user_to_be_created);
  //   resp.cookie('jwt', jwt);
  //   resp.cookie('provider', 'google');
  //   resp.cookie('uid', uid);
  //   resp.cookie('user', name);
  //   resp.redirect(`http://localhost:5173/callback`);
  //   //return data;
  //   //return resp;
  // }
}
