package com.artemis.petshop.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class OrderRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = true)
    @JoinColumn(name = "user_id", nullable = true)
    private AppUser user;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    @Embedded
    private Address address;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String couponCode;
    private BigDecimal subtotal;
    private BigDecimal discount;
    private BigDecimal total;
    private Instant createdAt;

    // novo: indicador de retirada e código de pagamento (PIX chave ou boleto)
    private boolean pickup;
    private String paymentCode;

    public OrderRecord(AppUser user, List<OrderItem> items, Address address, PaymentMethod paymentMethod, OrderStatus status, String couponCode, BigDecimal subtotal, BigDecimal discount, BigDecimal total) {
        this.user = user;
        this.items = items;
        this.address = address;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.couponCode = couponCode;
        this.subtotal = subtotal;
        this.discount = discount;
        this.total = total;
        this.createdAt = Instant.now();
    }
}
