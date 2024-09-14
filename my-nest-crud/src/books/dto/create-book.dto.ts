import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
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
    required: false,
  })
  readonly description?: string;

  @ApiProperty({
    description: 'Data de publicação',
    example: '2021-06-15T00:00:00.000Z',
    required: false,
  })
  readonly publishedDate?: Date;
}
