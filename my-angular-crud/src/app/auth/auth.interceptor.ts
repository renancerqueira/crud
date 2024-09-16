import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {

    console.log('Interceptor registrado');

  }

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

    return next.handle(req).pipe(
      catchError((error: any) => {
        let errorMessage = 'Ocorreu um erro inesperado.';
    
        if (error instanceof HttpErrorResponse) {
          // Se for um erro HTTP, tratar conforme o status
          if (error.status === 404) {
            errorMessage = 'Recurso não encontrado (404).';
          } else if (error.status === 500) {
            errorMessage = 'Erro interno do servidor (500).';
          }
        } else {
          // Se for um erro de rede (ex: ERR_CONNECTION_REFUSED)
          errorMessage = 'Falha na conexão com o servidor. Verifique sua rede.';
        }
    
        console.log(errorMessage);
    
        // Exibe a notificação
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000, // A notificação ficará visível por 5 segundos
        });
    
        return throwError(() => new Error(errorMessage));
      })
    );
    
  }
}
