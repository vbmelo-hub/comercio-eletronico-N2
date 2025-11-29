import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../models';
import { labelPetType } from '../../labels';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="cartao produto">
      <img [src]="product?.urlImagem" [alt]="product?.nome">
      <div class="linha">
        <span class="selo">{{product?.categoria?.nome}} - {{labelPetType(product?.tipoPet)}}</span>
        <span class="selo">Nota: {{product?.avaliacao}}</span>
      </div>
      <h3>{{product?.nome}}</h3>
      <p class="suave">{{product?.descricao}}</p>
      <div class="rodape-cartao">
        <span class="preco">{{product?.preco | currency:'BRL':'symbol'}}</span>
        <span class="suave">Estoque: {{product?.estoque}}</span>
      </div>
      <button class="botao primario acao" (click)="add.emit(product)" title="Clique para adicionar ao carrinho">Adicionar ao carrinho</button>
    </article>
  `
})
export class ProductCardComponent {
  @Input() product!: Produto;
  @Output() add = new EventEmitter<Produto>();

  labelPetType = labelPetType;
}
