import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, HttpModule],
  providers: [JwtService, UserService, AuthService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
