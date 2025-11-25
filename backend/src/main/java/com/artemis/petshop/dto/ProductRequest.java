package com.artemis.petshop.dto;

import com.artemis.petshop.model.PetType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotNull
    private BigDecimal price;
    @NotNull
    @Min(0)
    private Integer stock;
    private Double rating = 4.5;
    private String imageUrl;
    @NotNull
    private PetType petType;
    @NotNull
    private Long categoryId;
}
