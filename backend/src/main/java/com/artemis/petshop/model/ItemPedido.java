package com.artemis.petshop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long produtoId;
    private String nomeProduto;
    private Integer quantidade;
    private BigDecimal preco;
    private BigDecimal total;

    public ItemPedido(Long produtoId, String nomeProduto, Integer quantidade, BigDecimal preco) {
        this.produtoId = produtoId;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.preco = preco;
        this.total = preco.multiply(BigDecimal.valueOf(quantidade));
    }
}
