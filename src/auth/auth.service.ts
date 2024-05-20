import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

interface UserdataGoogle {
  name: string;
  picture: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async getOrCreateUser(user: CreateUserDto) {
    if (!user) {
      throw new Error('User not found!!!');
    }

    // const u = await this.prisma.user.findUnique({
    //   where: {
    //     unique_provider_id: {
    //       provider: 'github',
    //       providerAccountId: user.provider_account_id,
    //     },
    //   },
    // });
    //
    // console.log(`u is ========`);
    // console.log(u);
    //
    // if (!u) {
    //   console.log('creating user...');
    //   await this.prisma.user.create({
    //     data: {
    //       email: user.email,
    //       name: user.name,
    //       photo: user.photo,
    //       country: user.country,
    //       timezone: user.timezone,
    //       provider: user.provider,
    //       providerAccountId: user.provider_account_id,
    //       createAt: new Date(4, 6, 1).toISOString(),
    //     },
    //   });
    // }

    const u = await this.prisma.user.upsert({
      where: {
        unique_provider_id: {
          provider: 'github',
          providerAccountId: user.provider_account_id,
        },
      },
      create: {
        //uid: uuidv4(),
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

    const jwt = this.jwtService.sign({ id: u.id, name: u.name });
    console.log('jwt is');
    console.log(jwt);
    return { jwt };
  }

  async getGoogleUserData(accessToken: string): Promise<UserdataGoogle> {
    console.log(`access token is `, accessToken);
    const headersRequest = {
      //'Content-Type': 'application/json', // afaik this one is not needed
      Authorization: `Bearer ${accessToken}`,
    };
    console.log(`calling....`);
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
