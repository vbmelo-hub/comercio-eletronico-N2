package com.artemis.petshop.model;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
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
    @JoinTable(
            name = "pedido_itens",
            joinColumns = @JoinColumn(name = "pedido_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id")
    )
    private List<ItemPedido> itens = new ArrayList<>();

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "nome", column = @Column(name = "endereco_nome")),
            @AttributeOverride(name = "email", column = @Column(name = "endereco_email")),
            @AttributeOverride(name = "rua", column = @Column(name = "endereco_rua")),
            @AttributeOverride(name = "cidade", column = @Column(name = "endereco_cidade")),
            @AttributeOverride(name = "estado", column = @Column(name = "endereco_estado")),
            @AttributeOverride(name = "cep", column = @Column(name = "endereco_cep"))
    })
    private Endereco endereco;

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pagamento")
    private MetodoPagamento metodoPagamento;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusPedido status;

    @Column(name = "codigo_cupom")
    private String codigoCupom;
    private BigDecimal subtotal;
    private BigDecimal desconto;
    private BigDecimal total;
    @Column(name = "criado_em")
    private Instant criadoEm;

    private boolean retirada;
    @Column(name = "codigo_pagamento")
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
