package com.artemis.petshop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Cupom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private Integer percentualDesconto;
    private boolean ativo;

    public Cupom(String codigo, Integer percentualDesconto, boolean ativo) {
        this.codigo = codigo;
        this.percentualDesconto = percentualDesconto;
        this.ativo = ativo;
    }
}
