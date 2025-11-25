package com.artemis.petshop.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class PetProfile {
    private String name;
    private String age;
    private String breed;

    public PetProfile(String name, String age, String breed) {
        this.name = name;
        this.age = age;
        this.breed = breed;
    }
}
