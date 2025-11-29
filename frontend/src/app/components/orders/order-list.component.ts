import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../models';
import { labelOrderStatus, labelPaymentMethod } from '../../labels';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid">
      <div class="order-card card" *ngFor="let o of orders">
        <div class="row">
          <strong>#{{o.id}}</strong>
          <span class="muted">{{o.criadoEm | date:'short'}}</span>
        </div>
        <div class="row">
          <span>{{o.itens.length}} itens</span>
          <span class="price">{{o.total | currency:'BRL':'symbol'}}</span>
        </div>
        <div class="muted">Pagamento: {{labelPaymentMethod(o.metodoPagamento)}} - Status: {{labelOrderStatus(o.status)}}</div>
        <button class="btn ghost full" (click)="viewPayment.emit(o)">Ver pagamento</button>
      </div>
      <p class="muted" *ngIf="!orders || orders.length===0">Sem pedidos ainda.</p>
    </div>
  `
})
export class OrderListComponent {
  @Input() orders: Pedido[] = [];
  @Output() viewPayment = new EventEmitter<Pedido>();

  labelPaymentMethod = labelPaymentMethod;
  labelOrderStatus = labelOrderStatus;
}
