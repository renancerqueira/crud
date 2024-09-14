import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login com nome de usuário e senha' })
  @ApiBody({
    type: AuthLoginDto,
    description: 'Dados para realizar o login',
  })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiBody({
    type: AuthRegisterDto,
    description: 'Dados para registrar um novo usuário',
  })
  @ApiResponse({
    status: 201,
    description: 'Registro bem-sucedido',
    schema: {
      example: {
        username: 'john_doe',
        password: '******',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos para registro' })
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter o perfil do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário autenticado',
    schema: {
      example: {
        userId: 1,
        username: 'john_doe',
      },
    },
  })
  getProfile(@Request() req) {
    return this.authService.profile(req.user);
  }
}