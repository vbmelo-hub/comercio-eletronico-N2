import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../modelos';
import { labelPetType } from '../../rotulos';

@Component({
  selector: 'app-cartao-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartao-produto.component.html',
  styleUrls: ['./cartao-produto.component.css']
})
export class ProductCardComponent {
  @Input() product!: Produto;
  @Output() add = new EventEmitter<Produto>();

  labelPetType = labelPetType;
}
