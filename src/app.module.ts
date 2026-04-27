import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ThreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
