import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cartao pilha bloco-admin">
      <div class="linha">
        <div>
          <p class="sobrancelha">Produtos</p>
          <h3>Cadastrar / editar</h3>
        </div>
        <button class="botao fantasma" (click)="refresh.emit()">Atualizar lista</button>
      </div>
      <div class="grade-mini">
        <label>Nome<input [(ngModel)]="product.nome"></label>
        <label>Descricao<input [(ngModel)]="product.descricao"></label>
        <label>Preco<input type="number" [(ngModel)]="product.preco"></label>
        <label>Estoque<input type="number" [(ngModel)]="product.estoque"></label>
        <label>Categoria
          <select [(ngModel)]="product.categoriaId">
            <option *ngFor="let c of categories" [ngValue]="c.id">{{c.nome}}</option>
          </select>
        </label>
        <label>Tipo pet
          <select [(ngModel)]="product.tipoPet">
            <option value="CAO">Caes</option>
            <option value="GATO">Gatos</option>
            <option value="ACESSORIO">Acessorios</option>
          </select>
        </label>
        <label>Imagem<input [(ngModel)]="product.urlImagem"></label>
      </div>
      <button class="botao primario" (click)="save.emit(product)">Salvar produto</button>
    </div>
  `
})
export class AdminProductFormComponent {
  @Input() product: any = {};
  @Input() categories: Categoria[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<void>();
}
