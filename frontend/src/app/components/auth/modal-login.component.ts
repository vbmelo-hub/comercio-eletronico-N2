import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginPanelComponent } from './painel-login.component';

@Component({
  selector: 'app-modal-login',
  standalone: true,
  imports: [CommonModule, LoginPanelComponent],
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent {
  @Input() visible = false;
  @Input() email = '';
  @Input() senha = '';
  @Output() login = new EventEmitter<{ email: string; senha: string }>();
  @Output() close = new EventEmitter<void>();
  @Output() openSignup = new EventEmitter<void>();
}
