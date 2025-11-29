import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models';
import { labelPetType } from '../../labels';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card product">
      <img [src]="product?.imageUrl" [alt]="product?.name">
      <div class="row">
        <span class="pill">{{product?.category?.name}} - {{labelPetType(product?.petType)}}</span>
        <span class="pill">Nota: {{product?.rating}}</span>
      </div>
      <h3>{{product?.name}}</h3>
      <p class="muted">{{product?.description}}</p>
      <div class="card-footer">
        <span class="price">{{product?.price | currency:'BRL':'symbol'}}</span>
        <span class="muted">Estoque: {{product?.stock}}</span>
      </div>
      <button class="btn primary cta" (click)="add.emit(product)" title="Clique para adicionar ao carrinho">Adicionar ao carrinho</button>
    </article>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();

  labelPetType = labelPetType;
}
