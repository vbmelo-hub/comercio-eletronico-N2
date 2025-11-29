package com.artemis.petshop.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class PerfilPet {
    private String nome;
    private String idade;
    private String raca;

    public PerfilPet(String nome, String idade, String raca) {
        this.nome = nome;
        this.idade = idade;
        this.raca = raca;
    }
}
