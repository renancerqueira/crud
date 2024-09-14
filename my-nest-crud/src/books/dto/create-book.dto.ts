import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Título do livro',
    example: 'Clean Code',
  })
  readonly title: string;

  @ApiProperty({
    description: 'Autor do livro',
    example: 'Robert C. Martin',
  })
  readonly author: string;

  @ApiProperty({
    description: 'Descrição do livro',
    example: 'Um livro sobre boas práticas de desenvolvimento de software.',
    required: false, // Este campo não é obrigatório
  })
  readonly description?: string;

  @ApiProperty({
    description: 'Data de publicação',
    example: '2021-06-15T00:00:00.000Z',
    required: false, // Este campo não é obrigatório
  })
  readonly publishedDate?: Date;
}
