import { ApiProperty } from '@nestjs/swagger';

class ThreadUserSnippetDto {
  @ApiProperty({ example: 'johndoe' })
  username!: string;
}

export class ThreadCreateResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId!: string;

  @ApiProperty({ example: 'Thread Title' })
  title!: string;

  @ApiProperty({ example: 'This is the content of the thread.' })
  content!: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}

export class ThreadResponseDto extends ThreadCreateResponseDto {
  @ApiProperty({ type: ThreadUserSnippetDto, required: false })
  user?: ThreadUserSnippetDto;
}
