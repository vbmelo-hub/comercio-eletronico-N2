import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignupPanelComponent } from './painel-cadastro.component';

@Component({
  selector: 'app-modal-signup',
  standalone: true,
  imports: [CommonModule, SignupPanelComponent],
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.css']
})
export class ModalSignupComponent {
  @Input() visible = false;
  @Input() name = '';
  @Input() email = '';
  @Input() password = '';
  @Output() signup = new EventEmitter<{ nome: string; email: string; senha: string }>();
  @Output() close = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();
}
