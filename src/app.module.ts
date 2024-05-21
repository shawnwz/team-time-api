import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { TeamService } from './team/team.service';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TeamController } from './team/team.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule],
  controllers: [AppController, TeamController, UserController],
  providers: [PrismaService, TeamService, UserService],
})
export class AppModule {}
