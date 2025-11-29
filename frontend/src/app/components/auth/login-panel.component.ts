import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack">
      <h3>Login</h3>
      <label>Email<input [(ngModel)]="email"></label>
      <label>Senha<input type="password" [(ngModel)]="senha"></label>
      <button class="btn primary full" (click)="login.emit({ email, senha })">Entrar</button>
      <p class="muted">Admin: admin&#64;petshop.com / admin123</p>
    </div>
  `
})
export class LoginPanelComponent {
  @Input() email = '';
  @Input() senha = '';
  @Output() login = new EventEmitter<{ email: string; senha: string }>();
}
