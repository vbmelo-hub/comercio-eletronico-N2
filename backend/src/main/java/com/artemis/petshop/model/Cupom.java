package com.artemis.petshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cupom")
@Data
@NoArgsConstructor
public class Cupom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    @Column(name = "percentual_desconto")
    private Integer percentualDesconto;
    private boolean ativo;

    public Cupom(String codigo, Integer percentualDesconto, boolean ativo) {
        this.codigo = codigo;
        this.percentualDesconto = percentualDesconto;
        this.ativo = ativo;
    }
}
