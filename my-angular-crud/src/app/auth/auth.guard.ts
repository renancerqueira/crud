import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('access_token');  // Verifica se há token no localStorage
    if (!isLoggedIn) {
      this.router.navigate(['/login']);  // Redireciona para login se o usuário não estiver logado
      return false;
    }
    return true;  // Permite o acesso à rota se o usuário estiver logado
  }
}
