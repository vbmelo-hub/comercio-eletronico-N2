package com.artemis.petshop.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class Endereco {
    private String nome;
    private String email;
    private String rua;
    private String cidade;
    private String estado;
    private String cep;

    public Endereco(String nome, String email, String rua, String cidade, String estado, String cep) {
        this.nome = nome;
        this.email = email;
        this.rua = rua;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }
}
