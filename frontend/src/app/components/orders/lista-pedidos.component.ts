import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetodoPagamento, Pedido } from '../../modelos';
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
  expandedOrderId: number | null = null;

  paymentRule(metodo: MetodoPagamento, retirada?: boolean | null): string {
    const isRetirada = !!retirada;
    if (isRetirada) {
      if (metodo === 'PIX') {
        return 'Retire quando o pagamento for confirmado';
      }
      if (metodo === 'CARTAO_RETIRADA' || metodo === 'DINHEIRO') {
        return 'Pague na loja em até 2h';
      }
      return 'Retirada em até 2h';
    }
    // Entrega
    if (metodo === 'CARTAO_ENTREGA' || metodo === 'DINHEIRO') {
      return 'Entrega em até 1h30 com pagamento na entrega';
    }
    return 'Entrega em até 1h30 após confirmação';
  }

  toggleTimeline(order: Pedido) {
    this.expandedOrderId = this.expandedOrderId === order.id ? null : order.id;
  }

  timelineSteps(order: Pedido) {
    const isRetirada = !!order.retirada;
    const mid = isRetirada ? 'Aguardando retirada' : 'Aguardando entrega';
    const confirm = isRetirada ? 'Retirada confirmada' : 'Entrega confirmada';
    const steps = ['Aguardando pagamento', mid, confirm, 'Pedido finalizado'];

    const statusIndex = this.statusIndex(order.status);
    const expired = this.isExpired(order);

    return steps.map((label, idx) => {
      let state: 'done' | 'current' | 'pending' | 'canceled' = 'pending';
      if (expired) {
        state = 'canceled';
      } else if (idx < statusIndex) {
        state = 'done';
      } else if (idx === statusIndex) {
        state = 'current';
      }
      return { label, state };
    });
  }

  private statusIndex(status: any): number {
    switch (status) {
      case 'ENVIADO':
        return 3; // finalizado
      case 'PROCESSANDO':
        return 1; // aguardando retirada/entrega
      case 'CANCELADO':
        return 3;
      case 'CONFIRMADO':
      default:
        return 0; // aguardando pagamento
    }
  }

  isExpired(order: Pedido): boolean {
    const created = new Date(order.criadoEm);
    if (isNaN(created.getTime())) return false;
    const diffMs = Date.now() - created.getTime();
    const diffMinutes = diffMs / 1000 / 60;
    if (order.retirada) {
      if (order.metodoPagamento === 'PIX') return false;
      return diffMinutes > 120;
    }
    // entrega
    return diffMinutes > 90;
  }
}
