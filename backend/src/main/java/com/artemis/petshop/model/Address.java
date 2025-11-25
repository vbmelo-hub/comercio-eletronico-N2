package com.artemis.petshop.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class Address {
    private String name;
    private String email;
    private String street;
    private String city;
    private String state;
    private String zip;

    public Address(String name, String email, String street, String city, String state, String zip) {
        this.name = name;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
}
