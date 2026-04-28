import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from 'src/_common/guards/jwt-auth.guard';
import { CreateThreadDto } from 'src/threads/dto/create-thread.dto';
import { UpdateThreadDto } from 'src/threads/dto/update-thread.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ThreadCreateResponseDto,
  ThreadResponseDto,
} from 'src/threads/dto/thread-response.dto';
import {
  MessageResponseDto,
  SuccessResponseDto,
} from 'src/_common/dtos/generic-response.dto';
import { ApiSuccessResponse } from 'src/_common/decorators/api-success-response.decorator';

@ApiExtraModels(SuccessResponseDto, ThreadResponseDto, ThreadCreateResponseDto)
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @ApiOperation({ summary: 'List all threads from all users' })
  @ApiSuccessResponse(ThreadResponseDto, { isArray: true })
  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'List threads belonging to the currently logged-in user',
  })
  @ApiSuccessResponse(ThreadResponseDto, { isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(JwtAuthGuard)
  @Get('my-threads')
  findMyThreads(@Request() req: ExpressRequest & { user: { userId: string } }) {
    return this.threadsService.findByUserId(req.user.userId);
  }

  @ApiOperation({ summary: 'View details of a specific thread by its ID' })
  @ApiParam({ name: 'id', description: 'The UUID of the thread' })
  @ApiSuccessResponse(ThreadResponseDto)
  @ApiResponse({ status: 404, description: 'Thread not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new thread' })
  @ApiSuccessResponse(ThreadResponseDto)
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post()
  create(
    @Request() req: ExpressRequest & { user: { userId: string } },
    @Body() dto: CreateThreadDto,
  ) {
    return this.threadsService.create(req.user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update the content of a thread' })
  @ApiParam({ name: 'id', description: 'The UUID of the thread' })
  @ApiSuccessResponse(ThreadResponseDto)
  @ApiResponse({
    status: 403,
    description: 'Forbidden: You do not own this thread.',
  })
  @ApiResponse({ status: 404, description: 'Thread not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user: { userId: string } },
    @Body() dto: UpdateThreadDto,
  ) {
    return this.threadsService.update(id, req.user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a thread' })
  @ApiParam({ name: 'id', description: 'The UUID of the thread' })
  @ApiSuccessResponse(MessageResponseDto)
  @ApiResponse({
    status: 403,
    description: 'Forbidden: You do not own this thread.',
  })
  @ApiResponse({ status: 404, description: 'Thread not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user: { userId: string } },
  ) {
    return this.threadsService.remove(id, req.user.userId);
  }
}
