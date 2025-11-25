package com.artemis.petshop.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CouponRequest {
    @NotBlank
    private String code;
    @Min(0)
    @Max(90)
    private Integer discountPercent;
    private boolean active = true;
}
