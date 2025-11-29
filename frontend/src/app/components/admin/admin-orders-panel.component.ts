import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../models';

@Component({
  selector: 'app-admin-orders-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cartao pilha pedidos-admin">
      <div class="linha">
        <div>
          <p class="sobrancelha">Pedidos</p>
          <h3>Pedidos recentes</h3>
        </div>
        <button class="botao fantasma" (click)="refresh.emit()">Atualizar</button>
      </div>
      <div class="lista-pedidos">
        <div class="linha-pedido" *ngFor="let o of orders">
          <div class="linha">
            <strong>#{{o.id}}</strong>
            <span class="suave">{{o.criadoEm | date:'short'}}</span>
          </div>
          <div class="linha">
            <span>{{o.itens.length}} itens</span>
            <span class="preco">{{o.total | currency:'BRL':'symbol'}}</span>
          </div>
          <div class="suave">Cliente: {{o.usuario?.nome || 'Visitante'}}</div>
        </div>
      </div>
    </div>
  `
})
export class AdminOrdersPanelComponent {
  @Input() orders: Pedido[] = [];
  @Output() refresh = new EventEmitter<void>();
}
