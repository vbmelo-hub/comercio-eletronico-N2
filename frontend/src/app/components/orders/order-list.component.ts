import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderRecord } from '../../models';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid">
      <div class="order-card card" *ngFor="let o of orders">
        <div class="row">
          <strong>#{{o.id}}</strong>
          <span class="muted">{{o.createdAt | date:'short'}}</span>
        </div>
        <div class="row">
          <span>{{o.items.length}} itens</span>
          <span class="price">{{o.total | currency:'BRL':'symbol'}}</span>
        </div>
        <div class="muted">Pagamento: {{o.paymentMethod}} · Status: {{o.status}}</div>
        <button class="btn ghost full" (click)="viewPayment.emit(o)">Ver pagamento</button>
      </div>
      <p class="muted" *ngIf="!orders || orders.length===0">Sem pedidos ainda.</p>
    </div>
  `
})
export class OrderListComponent {
  @Input() orders: OrderRecord[] = [];
  @Output() viewPayment = new EventEmitter<OrderRecord>();
}
