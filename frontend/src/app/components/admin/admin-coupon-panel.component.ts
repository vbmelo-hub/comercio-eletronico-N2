import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Coupon } from '../../models';

@Component({
  selector: 'app-admin-coupon-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack">
      <div class="row">
        <div>
          <p class="eyebrow">Cupons</p>
          <h3>Descontos</h3>
        </div>
        <button class="btn ghost" (click)="refresh.emit()">Atualizar</button>
      </div>
      <div class="mini-grid">
        <label>Codigo<input [(ngModel)]="coupon.code"></label>
        <label>Desconto %<input type="number" [(ngModel)]="coupon.discountPercent"></label>
        <label>Status
          <select [(ngModel)]="coupon.active">
            <option [ngValue]="true">Ativo</option>
            <option [ngValue]="false">Pausado</option>
          </select>
        </label>
      </div>
      <button class="btn ghost" (click)="save.emit(coupon)">Salvar cupom</button>
      <div class="pill-collection">
        <span class="pill" *ngFor="let c of coupons">{{c.code}} · {{c.discountPercent}}% · {{c.active ? 'ativo' : 'off'}}</span>
      </div>
    </div>
  `
})
export class AdminCouponPanelComponent {
  @Input() coupon: any = {};
  @Input() coupons: Coupon[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<void>();
}
