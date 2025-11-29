import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MetodoPagamento } from '../../models';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack cart-summary">
      <h3>Resumo e pagamento</h3>
      <div class="row">
        <label style="flex:1;">Cupom
          <input placeholder="BEMVINDO" [ngModel]="cupom" (ngModelChange)="cupomChange.emit($event)">
        </label>
        <button class="btn ghost" (click)="applyCoupon.emit()">Aplicar</button>
      </div>
      <div class="summary-lines">
        <div class="row"><span class="muted">Itens</span><strong>{{itemsCount}}</strong></div>
        <div class="row"><span class="muted">Subtotal</span><strong>{{cartTotal | currency:'BRL':'symbol'}}</strong></div>
        <div class="row" *ngIf="deliveryFee>0"><span class="muted">Entrega</span><strong>{{deliveryFee | currency:'BRL':'symbol'}}</strong></div>
        <div class="row"><span class="muted">Total</span><strong>{{totalWithDelivery | currency:'BRL':'symbol'}}</strong></div>
      </div>
      <div class="divider"></div>
      <div class="delivery-toggle">
        <label>
          <input type="radio" name="delivery" [checked]="!retirada" (change)="retiradaChange.emit(false)">
          <span>Entrega (+ R$15,00)</span>
        </label>
        <label>
          <input type="radio" name="delivery" [checked]="retirada" (change)="retiradaChange.emit(true)">
          <span>Retirar na loja</span>
        </label>
      </div>
      <div class="mini-grid">
        <label class="required">Nome<input [ngModel]="nome" (ngModelChange)="nomeChange.emit($event)" [class.filled]="nome"></label>
        <label class="required">Email<input [ngModel]="email" (ngModelChange)="emailChange.emit($event)" [class.filled]="email"></label>
      </div>
      <label [class.required]="!retirada">Endereco<input [disabled]="retirada" [ngModel]="rua" (ngModelChange)="ruaChange.emit($event)" [class.filled]="rua"></label>
      <div class="mini-grid">
        <label [class.required]="!retirada">Cidade<input [disabled]="retirada" [ngModel]="cidade" (ngModelChange)="cidadeChange.emit($event)" [class.filled]="cidade"></label>
        <label [class.required]="!retirada">Estado<input [disabled]="retirada" [ngModel]="estado" (ngModelChange)="estadoChange.emit($event)" [class.filled]="estado"></label>
      </div>
      <div class="mini-grid">
        <label [class.required]="!retirada">CEP<input [disabled]="retirada" [ngModel]="cep" (ngModelChange)="cepChange.emit($event)" [class.filled]="cep"></label>
        <label class="required">Pagamento
          <select [ngModel]="metodoPagamento" (ngModelChange)="metodoPagamentoChange.emit($event)" [class.filled]="metodoPagamento">
            <option value="PIX">PIX</option>
            <option value="BOLETO">Boleto</option>
            <option value="DINHEIRO">Dinheiro na entrega</option>
          </select>
        </label>
      </div>
      <div class="muted tiny" *ngIf="formError">{{formError}}</div>
      <button class="btn primary full" (click)="checkout.emit()">Finalizar</button>
    </div>
  `
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
