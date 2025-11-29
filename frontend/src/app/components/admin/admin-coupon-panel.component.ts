import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cupom } from '../../models';

@Component({
  selector: 'app-admin-coupon-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cartao pilha bloco-admin">
      <div class="linha">
        <div>
          <p class="sobrancelha">Cupons</p>
          <h3>Descontos</h3>
        </div>
        <button class="botao fantasma" (click)="refresh.emit()">Atualizar</button>
      </div>
      <div class="grade-mini">
        <label>Codigo<input [(ngModel)]="coupon.codigo"></label>
        <label>Desconto %<input type="number" [(ngModel)]="coupon.percentualDesconto"></label>
        <label>Status
          <select [(ngModel)]="coupon.ativo">
            <option [ngValue]="true">Ativo</option>
            <option [ngValue]="false">Pausado</option>
          </select>
        </label>
      </div>
      <button class="botao fantasma" (click)="save.emit(coupon)">Salvar cupom</button>
      <div class="colecao-selos">
        <span class="selo" *ngFor="let c of coupons">{{c.codigo}} - {{c.percentualDesconto}}% - {{c.ativo ? 'ativo' : 'off'}}</span>
      </div>
    </div>
  `
})
export class AdminCouponPanelComponent {
  @Input() coupon: any = {};
  @Input() coupons: Cupom[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<void>();
}
