import { ApiProperty } from '@nestjs/swagger';

export class SignInUser {
  @ApiProperty({
    description: 'department name',
    required: true,
    type: String,
  })
  userName: string;

  @ApiProperty({
    description: 'department name',
    required: true,
    type: String,
  })
  password: string;
}
