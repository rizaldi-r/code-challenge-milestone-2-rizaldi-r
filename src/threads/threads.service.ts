import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from 'src/threads/dto/create-thread.dto';
import { UpdateThreadDto } from 'src/threads/dto/update-thread.dto';

@Injectable()
export class ThreadsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateThreadDto) {
    return this.prisma.threads.create({
      data: {
        title: dto.title,
        content: dto.content,
        userId: userId,
      },
    });
  }

  async findAll() {
    return this.prisma.threads.findMany({
      include: {
        user: {
          select: { username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.threads.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const thread = await this.prisma.threads.findUnique({
      where: { id },
      include: { user: { select: { username: true } } },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }

    return thread;
  }

  async update(id: string, userId: string, dto: UpdateThreadDto) {
    const thread = await this.findOne(id);

    if (thread.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this thread',
      );
    }

    return this.prisma.threads.update({
      where: { id },
      data: { content: dto.content },
    });
  }

  async remove(id: string, userId: string) {
    const thread = await this.findOne(id);

    if (thread.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this thread',
      );
    }

    await this.prisma.threads.delete({ where: { id } });
    return { message: 'Thread deleted successfully' };
  }
}
