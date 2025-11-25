package com.artemis.petshop.controller;

import com.artemis.petshop.model.Category;
import com.artemis.petshop.model.PetType;
import com.artemis.petshop.model.Product;
import com.artemis.petshop.service.CategoryService;
import com.artemis.petshop.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@CrossOrigin(origins = "*")
public class CatalogController {
    private final ProductService productService;
    private final CategoryService categoryService;

    public CatalogController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/products")
    public List<Product> listProducts(@RequestParam(required = false) Long categoryId,
                                      @RequestParam(required = false) PetType petType,
                                      @RequestParam(required = false, defaultValue = "") String q) {
        return productService.list(categoryId, petType, q);
    }

    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.get(id);
    }

    @GetMapping("/categories")
    public List<Category> categories() {
        return categoryService.list();
    }
}
