import { Module } from '@nestjs/common';
import { GithubStrategy, GoogleStrategy, JwtStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: undefined,
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: '10h' },
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  providers: [
    AuthService,
    GithubStrategy,
    GoogleStrategy,
    JwtStrategy,
    PrismaService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
