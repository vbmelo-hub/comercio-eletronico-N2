import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../modelos';

@Component({
  selector: 'app-formulario-produto-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-produto-admin.component.html',
  styleUrls: ['./formulario-produto-admin.component.css']
})
export class AdminProductFormComponent {
  @Input() product: any = {};
  @Input() categories: Categoria[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<void>();
}
