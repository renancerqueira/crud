import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription('CRUD de Livros')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const swaggerSpecPath = join(process.cwd(), 'swagger-spec.json');
  writeFileSync(swaggerSpecPath, JSON.stringify(document));

  SwaggerModule.setup('api', app, document);

  app.getHttpAdapter().get('/swagger-json', (req, res) => {
    res.sendFile(swaggerSpecPath);
  });

  await app.listen(3000);
}
bootstrap();