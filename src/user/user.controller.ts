import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/_common/decorators/api-success-response.decorator';
import { JwtAuthGuard } from 'src/_common/guards/jwt-auth.guard';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a full user profile by ID' })
  @ApiParam({ name: 'id', description: 'Numeric ID of the user' })
  @ApiSuccessResponse(UserResponseDto)
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.findById(id);
  }
}
