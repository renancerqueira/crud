import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://root:password@localhost:27017/books?authSource=admin'),
    UsersModule,
    AuthModule,
    BooksModule
  ],
  providers: [AppService],
})
export class AppModule {}
