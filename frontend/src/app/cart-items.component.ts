import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem } from './models';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack cart-items-card">
      <div class="row">
        <h3>Itens</h3>
        <span class="pill muted">Total: {{cartItems?.length || 0}}</span>
      </div>
      <div class="cart-list">
        <div class="cart-row" *ngFor="let item of cartItems">
          <div class="cart-info">
            <strong>{{item.product.name}}</strong>
            <p class="muted">{{item.product.price | currency:'BRL':'symbol'}} · Estoque: {{item.product.stock}}</p>
          </div>
          <div class="cart-actions">
            <input
              type="number"
              min="1"
              [max]="item.product.stock"
              [(ngModel)]="item.quantity"
              (ngModelChange)="qtyChange.emit({ id: item.product.id, qty: $event })">
            <button class="btn ghost danger" (click)="removeItem.emit(item.product.id)">Remover</button>
          </div>
        </div>
        <p class="muted" *ngIf="!cartItems || cartItems.length===0">Carrinho vazio.</p>
      </div>
    </div>
  `
})
export class CartItemsComponent {
  @Input() cartItems: CartItem[] = [];
  @Output() qtyChange = new EventEmitter<{ id: number; qty: number }>();
  @Output() removeItem = new EventEmitter<number>();
}
