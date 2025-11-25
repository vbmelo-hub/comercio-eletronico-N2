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
    public List<OrderRecord> list(@RequestHeader("X-Auth-Token") String token) {
        AppUser user = authService.requireUser(token);
        return orderService.listForUser(user);
    }

    @PostMapping
    public OrderRecord create(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody OrderRequest request) {
        AppUser user = authService.requireUser(token);
        return orderService.createOrder(user, request);
    }
}
