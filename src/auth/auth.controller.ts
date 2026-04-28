import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from 'src/_common/guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/generated/prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: ExpressRequest & { user: Omit<User, 'passwordHash'> }) {
    return this.authService.login(req.user);
  }
}
