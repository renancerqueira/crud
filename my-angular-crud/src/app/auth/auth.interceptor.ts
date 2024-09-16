import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verifica se a requisição é para login ou registro
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
      return next.handle(req);  // Se for login ou register, não adiciona o token
    }

    // Obtém o token do localStorage
    const token = localStorage.getItem('access_token');
    
    if (token) {
      // Clona a requisição e adiciona o token no cabeçalho Authorization
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);  // Continua sem modificar se não houver token
  }
}
