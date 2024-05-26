import { Module } from '@nestjs/common';
import { GithubStrategy, GoogleStrategy, JwtStrategy, RefreshTokenStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   imports: undefined,
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       signOptions: { expiresIn: '10h' },
    //       secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    HttpModule,
  ],
  providers: [
    AuthService,
    GithubStrategy,
    GoogleStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    PrismaService,
    JwtService,
    UserService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
