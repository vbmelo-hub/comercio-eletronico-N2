package com.artemis.petshop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private Integer estoque;
    private Double avaliacao;
    private String urlImagem;

    @Enumerated(EnumType.STRING)
    private TipoPet tipoPet;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categoria categoria;

    public Produto(String nome, String descricao, BigDecimal preco, Integer estoque, Double avaliacao, String urlImagem, TipoPet tipoPet, Categoria categoria) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.estoque = estoque;
        this.avaliacao = avaliacao;
        this.urlImagem = urlImagem;
        this.tipoPet = tipoPet;
        this.categoria = categoria;
    }
}
