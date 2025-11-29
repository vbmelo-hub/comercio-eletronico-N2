import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../models';
import { labelPetType } from '../../labels';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card product">
      <img [src]="product?.urlImagem" [alt]="product?.nome">
      <div class="row">
        <span class="pill">{{product?.categoria?.nome}} - {{labelPetType(product?.tipoPet)}}</span>
        <span class="pill">Nota: {{product?.avaliacao}}</span>
      </div>
      <h3>{{product?.nome}}</h3>
      <p class="muted">{{product?.descricao}}</p>
      <div class="card-footer">
        <span class="price">{{product?.preco | currency:'BRL':'symbol'}}</span>
        <span class="muted">Estoque: {{product?.estoque}}</span>
      </div>
      <button class="btn primary cta" (click)="add.emit(product)" title="Clique para adicionar ao carrinho">Adicionar ao carrinho</button>
    </article>
  `
})
export class ProductCardComponent {
  @Input() product!: Produto;
  @Output() add = new EventEmitter<Produto>();

  labelPetType = labelPetType;
}
