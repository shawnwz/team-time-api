import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy as github_strategy } from 'passport-github';
import {
  Strategy as google_strategy,
  VerifyCallback,
} from 'passport-google-oauth2';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';

@Injectable()
export class GithubStrategy extends PassportStrategy(
  github_strategy,
  'github',
) {
  constructor(configservice: ConfigService) {
    super({
      clientID: configservice.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configservice.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3001/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return profile;
  }
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  google_strategy,
  'google',
) {
  constructor(configservice: ConfigService) {
    super({
      clientID: configservice.get<string>('AUTH_GOOGLE_ID'),
      clientSecret: configservice.get<string>('AUTH_GOOGLE_SECRET'),
      callbackURL: 'http://localhost:3001/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
