import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

interface UserdataGoogle {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getOrCreateUser(user: CreateUserDto) {
    if (!user) {
      throw new Error('User not found!!!');
    }

    const u = await this.prisma.user.upsert({
      where: {
        unique_provider_id: {
          provider: user.provider,
          providerAccountId: user.provider_account_id,
        },
      },
      create: {
        email: user.email,
        name: user.name,
        photo: user.photo,
        country: user.country,
        timezone: user.timezone,
        provider: user.provider,
        providerAccountId: user.provider_account_id,
        createAt: new Date().toISOString(),
      },
      update: {
        email: user.email,
        name: user.name,
        photo: user.photo,
        country: user.country,
        timezone: user.timezone,
      },
    });

    const jwt = await this.jwtService.signAsync({ id: u.id, name: u.name });
    return [jwt, u.id, u.name];
  }

  async verifyToken(token: string) {
    const p = this.jwtService.verifyAsync(token);
    return p;
  }

  async getGoogleUserData(accessToken: string): Promise<UserdataGoogle> {
    console.log(`access token is `, accessToken);
    const headersRequest = {
      //'Content-Type': 'application/json', // afaik this one is not needed
      Authorization: `Bearer ${accessToken}`,
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: headersRequest,
        })
        .pipe(
          catchError((error) => {
            throw `An Error happened. Msg: ${JSON.stringify(
              error?.response.data,
            )}`;
          }),
        ),
    );
    // this.httpService
    //   .get('https://www.googleapis.com/oauth2/v3/userinfo', {
    //     headers: headersRequest,
    //   })
    //   .subscribe((res) => {
    //     console.log(res.data);
    //     user.picture = res.data.picture;
    //     user.email = res.data.email;
    //     user.name = res.data.name;
    //   });
    return data;
  }
}
