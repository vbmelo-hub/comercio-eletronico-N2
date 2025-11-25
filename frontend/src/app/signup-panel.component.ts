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
      <label>Nome<input [(ngModel)]="name"></label>
      <label>Email<input [(ngModel)]="email"></label>
      <label>Senha<input type="password" [(ngModel)]="password"></label>
      <button class="btn ghost full" (click)="signup.emit({ name, email, password })">Cadastrar</button>
    </div>
  `
})
export class SignupPanelComponent {
  @Input() name = '';
  @Input() email = '';
  @Input() password = '';
  @Output() signup = new EventEmitter<{ name: string; email: string; password: string }>();
}
