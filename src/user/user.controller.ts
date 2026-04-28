import {
  Controller,
  Get,
  UseGuards,
  Request,
  ParseIntPipe,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/_common/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.findById(id);
  }
}
