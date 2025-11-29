import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../modelos';

@Component({
  selector: 'app-painel-pedidos-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel-pedidos-admin.component.html',
  styleUrls: ['./painel-pedidos-admin.component.css']
})
export class AdminOrdersPanelComponent {
  @Input() orders: Pedido[] = [];
  @Output() refresh = new EventEmitter<void>();
}
