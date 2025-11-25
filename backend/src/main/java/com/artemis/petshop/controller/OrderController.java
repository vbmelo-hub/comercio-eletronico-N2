package com.artemis.petshop.controller;

import com.artemis.petshop.dto.OrderRequest;
import com.artemis.petshop.model.AppUser;
import com.artemis.petshop.model.OrderRecord;
import com.artemis.petshop.service.AuthService;
import com.artemis.petshop.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderService orderService;
    private final AuthService authService;

    public OrderController(OrderService orderService, AuthService authService) {
        this.orderService = orderService;
        this.authService = authService;
    }

    @GetMapping
    public List<OrderRecord> list(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        AppUser user = authService.me(token);
        return orderService.listForUser(user);
    }

    @PostMapping
    public OrderRecord create(@RequestHeader(value = "X-Auth-Token", required = false) String token, @Valid @RequestBody OrderRequest request) {
        AppUser user = authService.me(token);
        return orderService.createOrder(user, request);
    }
}
