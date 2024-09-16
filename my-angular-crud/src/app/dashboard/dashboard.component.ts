import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';  // Para usar os ícones do Material

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    RouterModule,  // Necessário para navegação
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule  // Importante para os ícones do Material
  ]
})
export class DashboardComponent {}
