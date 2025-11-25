package com.artemis.petshop.dto;

import com.artemis.petshop.model.PaymentMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    @NotEmpty
    private List<OrderItemRequest> items;

    private String couponCode;

    @NotNull
    private PaymentMethod paymentMethod;

    @NotBlank
    private String name;
    @NotBlank
    private String email;
    // Endereço exigido apenas para entrega (validado no serviço)
    private String street;
    private String city;
    private String state;
    private String zip;

    // true = retirada; false = entrega
    private boolean pickup = false;
}
