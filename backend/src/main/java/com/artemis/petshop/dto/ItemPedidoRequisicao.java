package com.artemis.petshop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemPedidoRequisicao {
    @NotNull
    private Long produtoId;
    @NotNull
    @Min(1)
    private Integer quantidade;
}
