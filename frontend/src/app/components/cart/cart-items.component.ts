import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemCarrinho } from '../../models';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cartao pilha cartao-itens-carrinho">
      <div class="linha">
        <h3>Itens</h3>
        <span class="selo suave">Total: {{cartItems?.length || 0}}</span>
      </div>
      <div class="lista-carrinho">
        <div class="linha-carrinho" *ngFor="let item of cartItems">
          <div class="info-carrinho">
            <strong>{{item.produto.nome}}</strong>
            <p class="suave">{{item.produto.preco | currency:'BRL':'symbol'}} - Estoque: {{item.produto.estoque}}</p>
          </div>
          <div class="acoes-carrinho">
            <input
              type="number"
              min="1"
              [max]="item.produto.estoque"
              [(ngModel)]="item.quantidade"
              (ngModelChange)="qtyChange.emit({ id: item.produto.id, qty: $event })">
            <button class="botao fantasma perigo" (click)="removeItem.emit(item.produto.id)">Remover</button>
          </div>
        </div>
        <p class="suave" *ngIf="!cartItems || cartItems.length===0">Carrinho vazio.</p>
      </div>
    </div>
  `
})
export class CartItemsComponent {
  @Input() cartItems: ItemCarrinho[] = [];
  @Output() qtyChange = new EventEmitter<{ id: number; qty: number }>();
  @Output() removeItem = new EventEmitter<number>();
}
