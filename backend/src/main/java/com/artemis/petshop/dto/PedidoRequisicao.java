package com.artemis.petshop.dto;

import com.artemis.petshop.model.MetodoPagamento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class PedidoRequisicao {
    @NotEmpty
    private List<ItemPedidoRequisicao> itens;

    private String codigoCupom;

    @NotNull
    private MetodoPagamento metodoPagamento;

    @NotBlank
    private String nome;
    @NotBlank
    private String email;
    private String rua;
    private String cidade;
    private String estado;
    private String cep;

    private boolean retirada = false;
}
