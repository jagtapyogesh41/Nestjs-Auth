import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  constructor(
    public data: T | null,
    public message: string,
    public success: boolean,
    public statusCode: number,
    public timestamp: number,
  ) {}
}

export class RequestDate {
  @ApiProperty({
    description: 'Start Date',
    required: true,
    type: Date,
  })
  startDate: Date;

  @ApiProperty({
    description: 'End Date',
    required: true,
    type: Date,
  })
  endDate: Date;
}
