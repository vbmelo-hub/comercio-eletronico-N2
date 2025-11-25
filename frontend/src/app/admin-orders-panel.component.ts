import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderRecord } from './models';

@Component({
  selector: 'app-admin-orders-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card stack admin-orders">
      <div class="row">
        <div>
          <p class="eyebrow">Pedidos</p>
          <h3>Pedidos recentes</h3>
        </div>
        <button class="btn ghost" (click)="refresh.emit()">Atualizar</button>
      </div>
      <div class="order-list">
        <div class="order-row" *ngFor="let o of orders">
          <div class="row">
            <strong>#{{o.id}}</strong>
            <span class="muted">{{o.createdAt | date:'short'}}</span>
          </div>
          <div class="row">
            <span>{{o.items.length}} itens</span>
            <span class="price">{{o.total | currency:'BRL':'symbol'}}</span>
          </div>
          <div class="muted">Cliente: {{o.user?.name || 'Visitante'}}</div>
        </div>
      </div>
    </div>
  `
})
export class AdminOrdersPanelComponent {
  @Input() orders: OrderRecord[] = [];
  @Output() refresh = new EventEmitter<void>();
}
