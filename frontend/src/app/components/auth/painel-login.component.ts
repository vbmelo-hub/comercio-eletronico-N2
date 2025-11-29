import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-login.component.html',
  styleUrls: ['./painel-login.component.css']
})
export class LoginPanelComponent {
  @Input() email = '';
  @Input() senha = '';
  @Output() login = new EventEmitter<{ email: string; senha: string }>();
}
