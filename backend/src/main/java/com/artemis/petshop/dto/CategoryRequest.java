package com.artemis.petshop.dto;

import com.artemis.petshop.model.PetType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank
    private String name;
    @NotNull
    private PetType petType;
}
