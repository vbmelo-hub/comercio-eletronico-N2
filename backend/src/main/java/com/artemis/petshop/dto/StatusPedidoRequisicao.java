package com.artemis.petshop.dto;

import com.artemis.petshop.model.StatusPedido;
import jakarta.validation.constraints.NotNull;

public class StatusPedidoRequisicao {
    @NotNull
    private StatusPedido status;

    public StatusPedido getStatus() {
        return status;
    }

    public void setStatus(StatusPedido status) {
        this.status = status;
    }
}
