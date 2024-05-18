import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

interface UserdataGoogle {
  name: string;
  picture: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

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
