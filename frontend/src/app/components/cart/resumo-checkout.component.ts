import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MetodoPagamento } from '../../modelos';

@Component({
  selector: 'app-resumo-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resumo-checkout.component.html',
  styleUrls: ['./resumo-checkout.component.css']
})
export class CheckoutSummaryComponent {
  @Input() itemsCount = 0;
  @Input() cartTotal = 0;
  @Input() deliveryFee = 0;
  @Input() totalWithDelivery = 0;
  @Input() cupom = '';
  @Input() retirada = false;
  @Input() nome = '';
  @Input() email = '';
  @Input() rua = '';
  @Input() cidade = '';
  @Input() estado = '';
  @Input() cep = '';
  @Input() metodoPagamento: MetodoPagamento = 'PIX';
  @Input() formError = '';

  @Output() cupomChange = new EventEmitter<string>();
  @Output() applyCoupon = new EventEmitter<void>();
  @Output() retiradaChange = new EventEmitter<boolean>();
  @Output() nomeChange = new EventEmitter<string>();
  @Output() emailChange = new EventEmitter<string>();
  @Output() ruaChange = new EventEmitter<string>();
  @Output() cidadeChange = new EventEmitter<string>();
  @Output() estadoChange = new EventEmitter<string>();
  @Output() cepChange = new EventEmitter<string>();
  @Output() metodoPagamentoChange = new EventEmitter<MetodoPagamento>();
  @Output() checkout = new EventEmitter<void>();
}
