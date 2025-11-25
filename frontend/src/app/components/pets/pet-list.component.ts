import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetProfile } from '../../models';

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
        <span class="pill" *ngFor="let p of pets">{{p.name}} · {{p.age}} · {{p.breed}}</span>
      </div>
      <div class="mini-grid">
        <label>Nome<input [(ngModel)]="petForm.name"></label>
        <label>Idade<input [(ngModel)]="petForm.age"></label>
        <label>Raca<input [(ngModel)]="petForm.breed"></label>
      </div>
      <button class="btn ghost" (click)="addPet()">Adicionar pet</button>
    </div>
  `
})
export class PetListComponent {
  @Input() enabled = false;
  @Input() ownerName = '';
  @Input() pets: PetProfile[] = [];
  @Output() add = new EventEmitter<PetProfile>();

  petForm: PetProfile = { name: '', age: '', breed: '' };

  addPet() {
    if (!this.petForm.name.trim()) return;
    this.add.emit({ ...this.petForm });
    this.petForm = { name: '', age: '', breed: '' };
  }
}
