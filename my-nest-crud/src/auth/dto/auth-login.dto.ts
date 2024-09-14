import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    description: 'Nome de usuário para login',
    example: 'john_doe',
  })
  readonly username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'password123',
  })
  readonly password: string;
}
