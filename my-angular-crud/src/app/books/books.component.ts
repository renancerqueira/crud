import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { ApiService } from '../services/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    DatePipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class BooksComponent implements OnInit {
  books: MatTableDataSource<Books> = new MatTableDataSource<Books>();
  bookForm: FormGroup;
  isEditMode = false;
  editingBookId: string | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      publishedDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getBooks();
  }

  // Função para obter todos os livros
  getBooks(): void {
    this.apiService.getBooks()
      .subscribe({
        next: (response) => {
          this.books = response;
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao obter livros', error);
        }
      });
  }

  // Função para adicionar ou editar um livro
  saveBook(): void {
    const newBook = this.bookForm.value;
    console.log(this.isEditMode, this.editingBookId);
    if (this.isEditMode && this.editingBookId) {
      this.apiService.editBook(this.editingBookId, newBook)
        .subscribe({
          next: () => {
            this.getBooks();
            this.resetForm();
          },
          error: (error) => {
            console.error('Erro ao editar o livro', error);
          }
        });
    } else {
      this.apiService.addBook(newBook)
        .subscribe({
          next: () => {
            this.getBooks();
            this.resetForm();
          },
          error: (error) => {
            console.error('Erro ao adicionar o livro', error);
          }
        });
    }
  }

  // Função para editar um livro
  editBook(book: any): void {
    this.bookForm.patchValue(book);
    this.isEditMode = true;
    this.editingBookId = book._id || null;
  }

  // Função para deletar um livro
  deleteBook(bookId: string): void {
    this.apiService.deleteBook(bookId)
      .subscribe({
        next: () => {
          this.getBooks();
        },
        error: (error) => {
          console.error('Erro ao deletar o livro', error);
        }
      });
  }

  // Resetar o formulário
  resetForm(): void {
    this.bookForm.reset();
    this.isEditMode = false;
    this.editingBookId = null;
  }
}

export class Books {
  _id!: string;
  title!: string;
  author!: string;
  description!: string;
  publishedDate!: string;
}