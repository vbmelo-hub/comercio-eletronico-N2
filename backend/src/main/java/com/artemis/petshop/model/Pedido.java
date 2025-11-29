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
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = true)
    @JoinColumn(name = "user_id", nullable = true)
    private Usuario usuario;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemPedido> itens = new ArrayList<>();

    @Embedded
    private Endereco endereco;

    @Enumerated(EnumType.STRING)
    private MetodoPagamento metodoPagamento;

    @Enumerated(EnumType.STRING)
    private StatusPedido status;

    private String codigoCupom;
    private BigDecimal subtotal;
    private BigDecimal desconto;
    private BigDecimal total;
    private Instant criadoEm;

    private boolean retirada;
    private String codigoPagamento;

    public Pedido(Usuario usuario, List<ItemPedido> itens, Endereco endereco, MetodoPagamento metodoPagamento, StatusPedido status, String codigoCupom, BigDecimal subtotal, BigDecimal desconto, BigDecimal total) {
        this.usuario = usuario;
        this.itens = itens;
        this.endereco = endereco;
        this.metodoPagamento = metodoPagamento;
        this.status = status;
        this.codigoCupom = codigoCupom;
        this.subtotal = subtotal;
        this.desconto = desconto;
        this.total = total;
        this.criadoEm = Instant.now();
    }
}
