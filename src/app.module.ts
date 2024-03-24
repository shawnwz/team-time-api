import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { TeamService } from './team/team.service';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TeamController } from './team/team.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [AppController, TeamController],
  providers: [PrismaService, TeamService, UserService],
})
export class AppModule {}
