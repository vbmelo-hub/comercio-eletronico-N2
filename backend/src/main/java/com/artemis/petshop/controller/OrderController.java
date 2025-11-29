package com.artemis.petshop.controller;

import com.artemis.petshop.dto.PedidoRequisicao;
import com.artemis.petshop.model.Usuario;
import com.artemis.petshop.model.Pedido;
import com.artemis.petshop.service.AuthService;
import com.artemis.petshop.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    private final PedidoService pedidoService;
    private final AuthService authService;

    public OrderController(PedidoService pedidoService, AuthService authService) {
        this.pedidoService = pedidoService;
        this.authService = authService;
    }

    @GetMapping
    public List<Pedido> list(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        Usuario usuario = authService.me(token);
        return pedidoService.listForUser(usuario);
    }

    @PostMapping
    public Pedido create(@RequestHeader(value = "X-Auth-Token", required = false) String token, @Valid @RequestBody PedidoRequisicao requisicao) {
        Usuario usuario = authService.me(token);
        return pedidoService.createOrder(usuario, requisicao);
    }
}
