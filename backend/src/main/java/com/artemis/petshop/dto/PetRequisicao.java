package com.artemis.petshop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PetRequisicao {
    @NotBlank
    private String nome;
    private String idade;
    private String raca;
}
