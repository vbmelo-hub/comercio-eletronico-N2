import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria, Produto } from '../../modelos';

@Component({
  selector: 'app-formulario-produto-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-produto-admin.component.html',
  styleUrls: ['./formulario-produto-admin.component.css']
})
export class AdminProductFormComponent {
  @Input() product: any = {};
  @Input() products: Produto[] = [];
  @Input() categories: Categoria[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();
  @Output() select = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<void>();

  selectProduct(id: number | string) {
    if (!id) {
      this.novoProduto();
      return;
    }
    const found = this.products.find(p => String(p.id) === String(id));
    if (found) {
      // cria uma cópia para edição
      const categoriaId = (found as any).categoriaId ?? found.categoria?.id ?? null;
      this.product = { ...found, categoriaId };
      this.select.emit(this.product);
    }
  }

  novoProduto() {
    this.product = { id: null, nome: '', descricao: '', preco: 0, estoque: 0, tipoPet: 'CAO', categoriaId: null, urlImagem: '' };
    this.select.emit(this.product);
  }

  excluirProduto() {
    if (this.product?.id) {
      this.remove.emit(this.product.id);
    }
  }
}
