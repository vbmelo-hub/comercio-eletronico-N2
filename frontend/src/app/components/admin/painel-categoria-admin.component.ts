import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../modelos';
import { labelPetType } from '../../rotulos';

@Component({
  selector: 'app-painel-categoria-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-categoria-admin.component.html',
  styleUrls: ['./painel-categoria-admin.component.css']
})
export class AdminCategoryPanelComponent {
  @Input() category: any = {};
  @Input() categories: Categoria[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();

  labelPetType = labelPetType;
}
