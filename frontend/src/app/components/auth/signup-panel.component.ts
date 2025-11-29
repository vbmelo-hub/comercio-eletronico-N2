import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack">
      <h3>Novo cadastro</h3>
      <label>Nome<input [(ngModel)]="nome"></label>
      <label>Email<input [(ngModel)]="email"></label>
      <label>Senha<input type="password" [(ngModel)]="senha"></label>
      <button class="btn ghost full" (click)="signup.emit({ nome, email, senha })">Cadastrar</button>
    </div>
  `
})
export class SignupPanelComponent {
  @Input() nome = '';
  @Input() email = '';
  @Input() senha = '';
  @Output() signup = new EventEmitter<{ nome: string; email: string; senha: string }>();
}
