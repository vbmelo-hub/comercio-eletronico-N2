import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models';
import { labelPetType } from '../../labels';

@Component({
  selector: 'app-admin-category-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack">
      <div class="row">
        <div>
          <p class="eyebrow">Categorias</p>
          <h3>Gerenciar</h3>
        </div>
        <button class="btn ghost" (click)="refresh.emit()">Atualizar</button>
      </div>
      <div class="mini-grid">
        <label>Nome<input [(ngModel)]="category.nome"></label>
        <label>Pet
          <select [(ngModel)]="category.tipoPet">
            <option value="CAO">Caes</option>
            <option value="GATO">Gatos</option>
            <option value="ACESSORIO">Acessorios</option>
          </select>
        </label>
      </div>
      <button class="btn ghost" (click)="save.emit(category)">Salvar categoria</button>
      <div class="pill-collection">
        <span class="pill" *ngFor="let c of categories">
          {{c.nome}} - {{labelPetType(c.tipoPet)}}
          <button class="btn ghost danger" (click)="remove.emit(c.id)">x</button>
        </span>
      </div>
    </div>
  `
})
export class AdminCategoryPanelComponent {
  @Input() category: any = {};
  @Input() categories: Categoria[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();

  labelPetType = labelPetType;
}
