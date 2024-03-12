import { Module } from '@nestjs/common';
import { GithubStrategy, JwtStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
  ],
  providers: [GithubStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
