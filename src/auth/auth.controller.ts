import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from 'src/_common/guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/generated/prisma/client';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';
import { LoginResponseDto } from 'src/auth/dto/auth-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { ApiSuccessResponse } from 'src/_common/decorators/api-success-response.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiSuccessResponse(UserResponseDto, { status: 201 })
  @ApiResponse({
    status: 409,
    description: 'Email or username already exists.',
  })
  async register(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiSuccessResponse(LoginResponseDto, { status: 201 })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  login(@Request() req: ExpressRequest & { user: Omit<User, 'passwordHash'> }) {
    return this.authService.login(req.user);
  }
}
