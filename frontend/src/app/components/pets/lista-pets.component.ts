import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfilPet } from '../../modelos';

@Component({
  selector: 'app-lista-pets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-pets.component.html',
  styleUrls: ['./lista-pets.component.css']
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
