import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack admin-block">
      <div class="row">
        <div>
          <p class="eyebrow">Produtos</p>
          <h3>Cadastrar / editar</h3>
        </div>
        <button class="btn ghost" (click)="refresh.emit()">Atualizar lista</button>
      </div>
      <div class="mini-grid">
        <label>Nome<input [(ngModel)]="product.name"></label>
        <label>Descricao<input [(ngModel)]="product.description"></label>
        <label>Preco<input type="number" [(ngModel)]="product.price"></label>
        <label>Estoque<input type="number" [(ngModel)]="product.stock"></label>
        <label>Categoria
          <select [(ngModel)]="product.categoryId">
            <option *ngFor="let c of categories" [ngValue]="c.id">{{c.name}}</option>
          </select>
        </label>
        <label>Tipo pet
          <select [(ngModel)]="product.petType">
            <option value="DOG">Caes</option>
            <option value="CAT">Gatos</option>
            <option value="ACCESSORY">Acessorios</option>
          </select>
        </label>
        <label>Imagem<input [(ngModel)]="product.imageUrl"></label>
      </div>
      <button class="btn primary" (click)="save.emit(product)">Salvar produto</button>
    </div>
  `
})
export class AdminProductFormComponent {
  @Input() product: any = {};
  @Input() categories: Category[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<void>();
}
