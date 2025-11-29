import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../models';
import { labelOrderStatus, labelPaymentMethod } from '../../labels';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grade">
      <div class="cartao-pedido cartao" *ngFor="let o of orders">
        <div class="linha">
          <strong>#{{o.id}}</strong>
          <span class="suave">{{o.criadoEm | date:'short'}}</span>
        </div>
        <div class="linha">
          <span>{{o.itens.length}} itens</span>
          <span class="preco">{{o.total | currency:'BRL':'symbol'}}</span>
        </div>
        <div class="suave">Pagamento: {{labelPaymentMethod(o.metodoPagamento)}} - Status: {{labelOrderStatus(o.status)}}</div>
        <button class="botao fantasma cheio" (click)="viewPayment.emit(o)">Ver pagamento</button>
      </div>
      <p class="suave" *ngIf="!orders || orders.length===0">Sem pedidos ainda.</p>
    </div>
  `
})
export class OrderListComponent {
  @Input() orders: Pedido[] = [];
  @Output() viewPayment = new EventEmitter<Pedido>();

  labelPaymentMethod = labelPaymentMethod;
  labelOrderStatus = labelOrderStatus;
}
