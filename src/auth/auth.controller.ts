import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('/')
  async auth() {}

  @Get('/refresh')
  @UseGuards(AuthGuard('jwt'))
  async refresh(@Req() req, @Res() resp) {
    const user = req.user;
    const foundUser = await this.userService.findUser(user.id);
    if (!foundUser) throw new HttpException('', HttpStatus.BAD_REQUEST);
    const accessToken = await this.jwtService.signAsync(
      {
        sub: foundUser.id,
        username: foundUser.name,
      },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: '15s',
      },
    );
    resp.payload(accessToken);
  }

  @Post('/logout')
  async logout(@Req() req, @Res() resp) {
    console.log('xxxxxxx');
    const cookies = req.cookies;
    console.log(cookies);
    resp.cookie('accessToken', '');
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async loginGithub() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github')) //Todo check this out
  async authGithubCallback(@Req() req, @Res() resp) {
    const user = req.user;
    console.log(user);
    const user_to_be_created: CreateUserDto = {
      email: user._json.email,
      name: user.username,
      photo: user.photos[0].value,
      timezone: '',
      provider: user.provider,
      provider_account_id: user.id,
    };
    console.log('user to be created', user_to_be_created.name);
    console.log(JSON.stringify(user_to_be_created));
    const [accessToken, refreshToken, uid, userName, photo] =
      await this.authService.getOrCreateUser(user_to_be_created);
    resp.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      httpOnly: true,
      secure: false, // means to use https, change to true for production?
    });
    resp.cookie('accessToken', accessToken);
    resp.cookie('provider', 'github');
    resp.cookie('uid', uid);
    resp.cookie('userName', userName);
    resp.cookie('photo', photo);
    resp.redirect(`http://localhost:5173`);
    //return { accessToken: this.jwtService.sign(payload) };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async authGoogleCallback(@Req() req, @Res() resp) {
    console.log(req);
    const user = req.user;
    const user_to_be_created: CreateUserDto = {
      email: user.email,
      name: user.name,
      photo: user.picture,
      timezone: '',
      provider: user.provider,
      provider_account_id: user.providerId,
    };
    const [accessToken, refreshToken, uid, userName, photo] =
      await this.authService.getOrCreateUser(user_to_be_created);
    //resp.payload('accessToken', accessToken);
    resp.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      httpOnly: true,
      secure: false, // means to use https, change to true for production?
    });
    resp.cookie('accessToken', accessToken);
    resp.cookie('provider', 'google');
    resp.cookie('uid', uid);
    resp.cookie('userName', userName);
    resp.cookie('photo', photo);
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
