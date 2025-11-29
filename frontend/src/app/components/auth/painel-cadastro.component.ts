import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-cadastro.component.html',
  styleUrls: ['./painel-cadastro.component.css']
})
export class SignupPanelComponent {
  @Input() nome = '';
  @Input() email = '';
  @Input() senha = '';
  @Output() signup = new EventEmitter<{ nome: string; email: string; senha: string }>();
}
