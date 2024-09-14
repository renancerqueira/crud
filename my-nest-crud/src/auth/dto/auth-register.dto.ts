import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  @ApiProperty({
    description: 'Nome de usuário para registro',
    example: 'john_doe',
  })
  readonly username: string;

  @ApiProperty({
    description: 'Senha do usuário para registro',
    example: 'password123',
  })
  readonly password: string;
}
