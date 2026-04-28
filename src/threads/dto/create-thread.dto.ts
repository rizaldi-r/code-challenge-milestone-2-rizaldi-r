import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({
    description: 'The title of the thread',
    example: 'How do I set up environment variables in Node.js?',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'The main content or body of the thread',
    minLength: 10,
    example:
      'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  content!: string;
}
