package com.artemis.petshop.dto;

import com.artemis.petshop.model.TipoPet;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CategoriaRequisicao {
    @NotBlank
    private String nome;
    @NotNull
    private TipoPet tipoPet;
}
