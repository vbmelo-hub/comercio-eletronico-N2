import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentMethod } from './models';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack cart-summary">
      <h3>Resumo e pagamento</h3>
      <div class="row">
        <label style="flex:1;">Cupom
          <input placeholder="BEMVINDO" [ngModel]="coupon" (ngModelChange)="couponChange.emit($event)">
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
          <input type="radio" name="delivery" [checked]="!pickup" (change)="pickupChange.emit(false)">
          <span>Entrega (+ R$15,00)</span>
        </label>
        <label>
          <input type="radio" name="delivery" [checked]="pickup" (change)="pickupChange.emit(true)">
          <span>Retirar na loja</span>
        </label>
      </div>
      <div class="mini-grid">
        <label class="required">Nome<input [ngModel]="name" (ngModelChange)="nameChange.emit($event)" [class.filled]="name"></label>
        <label class="required">Email<input [ngModel]="email" (ngModelChange)="emailChange.emit($event)" [class.filled]="email"></label>
      </div>
      <label [class.required]="!pickup">Endereco<input [disabled]="pickup" [ngModel]="street" (ngModelChange)="streetChange.emit($event)" [class.filled]="street"></label>
      <div class="mini-grid">
        <label [class.required]="!pickup">Cidade<input [disabled]="pickup" [ngModel]="city" (ngModelChange)="cityChange.emit($event)" [class.filled]="city"></label>
        <label [class.required]="!pickup">Estado<input [disabled]="pickup" [ngModel]="state" (ngModelChange)="stateChange.emit($event)" [class.filled]="state"></label>
      </div>
      <div class="mini-grid">
        <label [class.required]="!pickup">CEP<input [disabled]="pickup" [ngModel]="zip" (ngModelChange)="zipChange.emit($event)" [class.filled]="zip"></label>
        <label class="required">Pagamento
          <select [ngModel]="paymentMethod" (ngModelChange)="paymentMethodChange.emit($event)" [class.filled]="paymentMethod">
            <option value="PIX">PIX</option>
            <option value="BOLETO">Boleto</option>
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
  @Input() coupon = '';
  @Input() pickup = false;
  @Input() name = '';
  @Input() email = '';
  @Input() street = '';
  @Input() city = '';
  @Input() state = '';
  @Input() zip = '';
  @Input() paymentMethod: PaymentMethod = 'PIX';
  @Input() formError = '';

  @Output() couponChange = new EventEmitter<string>();
  @Output() applyCoupon = new EventEmitter<void>();
  @Output() pickupChange = new EventEmitter<boolean>();
  @Output() nameChange = new EventEmitter<string>();
  @Output() emailChange = new EventEmitter<string>();
  @Output() streetChange = new EventEmitter<string>();
  @Output() cityChange = new EventEmitter<string>();
  @Output() stateChange = new EventEmitter<string>();
  @Output() zipChange = new EventEmitter<string>();
  @Output() paymentMethodChange = new EventEmitter<PaymentMethod>();
  @Output() checkout = new EventEmitter<void>();
}
