package com.artemis.petshop.controller;

import com.artemis.petshop.dto.CategoryRequest;
import com.artemis.petshop.dto.CouponRequest;
import com.artemis.petshop.dto.ProductRequest;
import com.artemis.petshop.model.AppUser;
import com.artemis.petshop.model.Category;
import com.artemis.petshop.model.Coupon;
import com.artemis.petshop.model.OrderRecord;
import com.artemis.petshop.model.Product;
import com.artemis.petshop.service.AuthService;
import com.artemis.petshop.service.CategoryService;
import com.artemis.petshop.service.CouponService;
import com.artemis.petshop.service.OrderService;
import com.artemis.petshop.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final AuthService authService;
    private final ProductService productService;
    private final CategoryService categoryService;
    private final CouponService couponService;
    private final OrderService orderService;

    public AdminController(AuthService authService, ProductService productService, CategoryService categoryService, CouponService couponService, OrderService orderService) {
        this.authService = authService;
        this.productService = productService;
        this.categoryService = categoryService;
        this.couponService = couponService;
        this.orderService = orderService;
    }

    @PostMapping("/products")
    public Product createProduct(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody ProductRequest request) {
        authService.requireAdmin(token);
        return productService.create(request);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@RequestHeader("X-Auth-Token") String token, @PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        authService.requireAdmin(token);
        return productService.update(id, request);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@RequestHeader("X-Auth-Token") String token, @PathVariable Long id) {
        authService.requireAdmin(token);
        productService.delete(id);
    }

    @PostMapping("/categories")
    public Category createCategory(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody CategoryRequest request) {
        authService.requireAdmin(token);
        return categoryService.create(request);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@RequestHeader("X-Auth-Token") String token, @PathVariable Long id) {
        authService.requireAdmin(token);
        categoryService.delete(id);
    }

    @PostMapping("/coupons")
    public Coupon saveCoupon(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody CouponRequest request) {
        authService.requireAdmin(token);
        return couponService.save(request);
    }

    @GetMapping("/coupons")
    public List<Coupon> listCoupons(@RequestHeader("X-Auth-Token") String token) {
        authService.requireAdmin(token);
        return couponService.list();
    }

    @GetMapping("/orders")
    public List<OrderRecord> allOrders(@RequestHeader("X-Auth-Token") String token) {
        AppUser admin = authService.requireAdmin(token);
        return orderService.listForUser(admin);
    }
}
