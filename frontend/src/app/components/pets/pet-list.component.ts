import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfilPet } from '../../models';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cartao pilha" *ngIf="enabled">
      <div class="linha">
        <div>
          <p class="sobrancelha">Pets</p>
          <h3>{{ownerName}}</h3>
        </div>
      </div>
      <div class="colecao-selos">
        <span class="selo" *ngFor="let p of pets">{{p.nome}} - {{p.idade}} - {{p.raca}}</span>
      </div>
      <div class="grade-mini">
        <label>Nome<input [(ngModel)]="petForm.nome"></label>
        <label>Idade<input [(ngModel)]="petForm.idade"></label>
        <label>Raca<input [(ngModel)]="petForm.raca"></label>
      </div>
      <button class="botao fantasma" (click)="addPet()">Adicionar pet</button>
    </div>
  `
})
export class PetListComponent {
  @Input() enabled = false;
  @Input() ownerName = '';
  @Input() pets: PerfilPet[] = [];
  @Output() add = new EventEmitter<PerfilPet>();

  petForm: PerfilPet = { nome: '', idade: '', raca: '' };

  addPet() {
    if (!this.petForm.nome.trim()) return;
    this.add.emit({ ...this.petForm });
    this.petForm = { nome: '', idade: '', raca: '' };
  }
}
