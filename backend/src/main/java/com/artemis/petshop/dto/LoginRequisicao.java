package com.artemis.petshop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequisicao {
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String senha;
}
