package com.artemis.petshop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PetRequest {
    @NotBlank
    private String name;
    private String age;
    private String breed;
}
