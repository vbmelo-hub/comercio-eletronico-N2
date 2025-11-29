import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../modelos';
import { labelOrderStatus, labelPaymentMethod } from '../../rotulos';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class OrderListComponent {
  @Input() orders: Pedido[] = [];
  @Output() viewPayment = new EventEmitter<Pedido>();

  labelPaymentMethod = labelPaymentMethod;
  labelOrderStatus = labelOrderStatus;
}
