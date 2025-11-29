import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models';

@Component({
  selector: 'app-catalog-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="barra-filtros">
      <label>
        <span class="suave tiny">Buscar</span>
        <input
          placeholder="Racao, brinquedo, petisco..."
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearch($event)"
        >
      </label>
      <label>
        <span class="suave tiny">Tipo de pet</span>
        <select [(ngModel)]="petFilter" (ngModelChange)="onPet($event)">
          <option value="">Todos</option>
          <option value="CAO">Caes</option>
          <option value="GATO">Gatos</option>
          <option value="ACESSORIO">Acessorios</option>
        </select>
      </label>
      <label>
        <span class="suave tiny">Categoria</span>
        <select [(ngModel)]="categoryFilter" (ngModelChange)="onCategory($event)">
          <option [ngValue]="null">Todas</option>
          <option *ngFor="let c of categories" [ngValue]="c.id">{{c.nome}}</option>
        </select>
      </label>
    </div>
  `
})
export class CatalogFiltersComponent {
  @Input() categories: Categoria[] = [];
  @Input() searchTerm = '';
  @Input() petFilter = '';
  @Input() categoryFilter: number | null = null;

  @Output() searchChange = new EventEmitter<string>();
  @Output() petChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<number | null>();

  onSearch(v: string) { this.searchChange.emit(v); }
  onPet(v: string) { this.petChange.emit(v); }
  onCategory(v: number | null) { this.categoryChange.emit(v); }
}
