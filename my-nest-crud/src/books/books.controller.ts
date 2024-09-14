import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/create-book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('books')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo livro' })
  @ApiBody({ type: BookDto })
  @ApiResponse({
    status: 201,
    description: 'Livro criado com sucesso.',
    type: BookDto
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createBookDto: BookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os livros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de livros retornada com sucesso.',
    type: [BookDto],
    example: [
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        description: 'Um livro sobre boas práticas de desenvolvimento de software.',
        publishedDate: '2021-06-15T00:00:00.000Z',
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        description: 'A journey to mastery in programming.',
        publishedDate: '2019-10-20T00:00:00.000Z',
      },
    ],
  })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um livro específico' })
  @ApiResponse({
    status: 200,
    description: 'Livro encontrado com sucesso.',
    type: BookDto
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar informações de um livro' })
  @ApiResponse({
    status: 200,
    description: 'Livro atualizado com sucesso.',
    type: BookDto
  })
  update(@Param('id') id: string, @Body() createBookDto: BookDto) {
    return this.booksService.update(id, createBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um livro' })
  @ApiResponse({ status: 200, description: 'Livro deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
