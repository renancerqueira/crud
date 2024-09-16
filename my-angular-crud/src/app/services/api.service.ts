import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Isso faz o service ser global, acessível de qualquer componente
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';  // URL base da API

  constructor(private http: HttpClient) {}

  // Função para obter todos os livros
  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/books`);
  }

  // Função para obter um livro por ID
  getBookById(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/books/${bookId}`);
  }

  // Função para adicionar um livro
  addBook(book: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/books`, book);
  }

  // Função para editar um livro
  editBook(bookId: string, book: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${bookId}`, book);
  }

  // Função para deletar um livro
  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${bookId}`);
  }

  // Função para login (não adiciona o token)
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // Função para registro (não adiciona o token)
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }
}
