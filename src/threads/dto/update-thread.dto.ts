import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateThreadDto {
  @ApiProperty({
    description: 'The updated content of the thread',
    example:
      'Updated content: I figured out how to set up environment variables in Node.js',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
