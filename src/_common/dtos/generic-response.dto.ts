import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetailDto {
  @ApiProperty({ example: 404 })
  code!: number;

  @ApiProperty({ example: 'Not Found' })
  message!: string;

  @ApiProperty({ example: 'NotFoundException' })
  error!: string;
}

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success!: boolean;

  @ApiProperty({ type: ErrorDetailDto })
  error!: ErrorDetailDto;
}

export class SuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success!: boolean;

  data!: T;
}

export class MessageResponseDto {
  @ApiProperty({ example: 'Operation successful' })
  message!: string;
}
