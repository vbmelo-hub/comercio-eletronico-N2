import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../modelos';

@Component({
  selector: 'app-filtros-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros-catalogo.component.html',
  styleUrls: ['./filtros-catalogo.component.css']
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
