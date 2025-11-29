import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cupom } from '../../modelos';

@Component({
  selector: 'app-painel-cupom-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-cupom-admin.component.html',
  styleUrls: ['./painel-cupom-admin.component.css']
})
export class AdminCouponPanelComponent {
  @Input() coupon: any = {};
  @Input() coupons: Cupom[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<void>();
}
