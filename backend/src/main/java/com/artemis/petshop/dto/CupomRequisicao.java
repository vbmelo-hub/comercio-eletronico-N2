package com.artemis.petshop.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CupomRequisicao {
    @NotBlank
    private String codigo;
    @Min(0)
    @Max(90)
    private Integer percentualDesconto;
    private boolean ativo = true;
}
