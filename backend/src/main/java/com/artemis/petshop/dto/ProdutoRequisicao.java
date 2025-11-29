package com.artemis.petshop.dto;

import com.artemis.petshop.model.TipoPet;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoRequisicao {
    @NotBlank
    private String nome;
    @NotBlank
    private String descricao;
    @NotNull
    private BigDecimal preco;
    @NotNull
    @Min(0)
    private Integer estoque;
    private Double avaliacao = 4.5;
    private String urlImagem;
    @NotNull
    private TipoPet tipoPet;
    @NotNull
    private Long categoriaId;
}
