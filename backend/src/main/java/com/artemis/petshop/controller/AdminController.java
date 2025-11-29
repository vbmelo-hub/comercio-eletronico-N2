package com.artemis.petshop.controller;

import com.artemis.petshop.dto.CategoriaRequisicao;
import com.artemis.petshop.dto.CupomRequisicao;
import com.artemis.petshop.dto.ProdutoRequisicao;
import com.artemis.petshop.model.Usuario;
import com.artemis.petshop.model.Categoria;
import com.artemis.petshop.model.Cupom;
import com.artemis.petshop.model.Pedido;
import com.artemis.petshop.model.Produto;
import com.artemis.petshop.service.AuthService;
import com.artemis.petshop.service.CategoriaService;
import com.artemis.petshop.service.CupomService;
import com.artemis.petshop.service.PedidoService;
import com.artemis.petshop.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final AuthService authService;
    private final ProdutoService produtoService;
    private final CategoriaService categoriaService;
    private final CupomService cupomService;
    private final PedidoService pedidoService;

    public AdminController(AuthService authService, ProdutoService produtoService, CategoriaService categoriaService, CupomService cupomService, PedidoService pedidoService) {
        this.authService = authService;
        this.produtoService = produtoService;
        this.categoriaService = categoriaService;
        this.cupomService = cupomService;
        this.pedidoService = pedidoService;
    }

    @PostMapping("/products")
    public Produto createProduct(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody ProdutoRequisicao request) {
        authService.requireAdmin(token);
        return produtoService.create(request);
    }

    @PutMapping("/products/{id}")
    public Produto updateProduct(@RequestHeader("X-Auth-Token") String token, @PathVariable Long id, @Valid @RequestBody ProdutoRequisicao request) {
        authService.requireAdmin(token);
        return produtoService.update(id, request);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@RequestHeader("X-Auth-Token") String token, @PathVariable Long id) {
        authService.requireAdmin(token);
        produtoService.delete(id);
    }

    @PostMapping("/categories")
    public Categoria createCategory(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody CategoriaRequisicao request) {
        authService.requireAdmin(token);
        return categoriaService.create(request);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@RequestHeader("X-Auth-Token") String token, @PathVariable Long id) {
        authService.requireAdmin(token);
        categoriaService.delete(id);
    }

    @PostMapping("/coupons")
    public Cupom saveCoupon(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody CupomRequisicao request) {
        authService.requireAdmin(token);
        return cupomService.save(request);
    }

    @GetMapping("/coupons")
    public List<Cupom> listCoupons(@RequestHeader("X-Auth-Token") String token) {
        authService.requireAdmin(token);
        return cupomService.list();
    }

    @GetMapping("/orders")
    public List<Pedido> allOrders(@RequestHeader("X-Auth-Token") String token) {
        Usuario admin = authService.requireAdmin(token);
        return pedidoService.listForUser(admin);
    }
}
