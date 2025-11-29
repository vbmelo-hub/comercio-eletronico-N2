package com.artemis.petshop.controller;

import com.artemis.petshop.model.Categoria;
import com.artemis.petshop.model.TipoPet;
import com.artemis.petshop.model.Produto;
import com.artemis.petshop.service.CategoriaService;
import com.artemis.petshop.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@CrossOrigin(origins = "*")
public class CatalogController {
    private final ProdutoService produtoService;
    private final CategoriaService categoriaService;

    public CatalogController(ProdutoService produtoService, CategoriaService categoriaService) {
        this.produtoService = produtoService;
        this.categoriaService = categoriaService;
    }

    @GetMapping("/products")
    public List<Produto> listProducts(@RequestParam(required = false) Long categoryId,
                                      @RequestParam(required = false) TipoPet petType,
                                      @RequestParam(required = false, defaultValue = "") String q) {
        return produtoService.list(categoryId, petType, q);
    }

    @GetMapping("/products/{id}")
    public Produto getProduct(@PathVariable Long id) {
        return produtoService.get(id);
    }

    @GetMapping("/categories")
    public List<Categoria> categories() {
        return categoriaService.list();
    }
}
