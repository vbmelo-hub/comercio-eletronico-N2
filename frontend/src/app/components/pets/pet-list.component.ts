import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfilPet } from '../../models';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card stack" *ngIf="enabled">
      <div class="row">
        <div>
          <p class="eyebrow">Pets</p>
          <h3>{{ownerName}}</h3>
        </div>
      </div>
      <div class="pill-collection">
        <span class="pill" *ngFor="let p of pets">{{p.nome}} - {{p.idade}} - {{p.raca}}</span>
      </div>
      <div class="mini-grid">
        <label>Nome<input [(ngModel)]="petForm.nome"></label>
        <label>Idade<input [(ngModel)]="petForm.idade"></label>
        <label>Raca<input [(ngModel)]="petForm.raca"></label>
      </div>
      <button class="btn ghost" (click)="addPet()">Adicionar pet</button>
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
