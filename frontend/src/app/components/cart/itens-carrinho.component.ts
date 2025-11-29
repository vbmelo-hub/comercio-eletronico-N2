import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemCarrinho } from '../../modelos';

@Component({
  selector: 'app-itens-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './itens-carrinho.component.html',
  styleUrls: ['./itens-carrinho.component.css']
})
export class CartItemsComponent {
  @Input() cartItems: ItemCarrinho[] = [];
  @Output() qtyChange = new EventEmitter<{ id: number; qty: number }>();
  @Output() removeItem = new EventEmitter<number>();
}
