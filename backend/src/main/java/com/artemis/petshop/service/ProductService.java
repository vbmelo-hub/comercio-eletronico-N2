package com.artemis.petshop.service;

import com.artemis.petshop.dto.ProductRequest;
import com.artemis.petshop.model.Category;
import com.artemis.petshop.model.Product;
import com.artemis.petshop.model.PetType;
import com.artemis.petshop.repository.CategoryRepository;
import com.artemis.petshop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> list(Long categoryId, PetType petType, String search) {
        String q = search == null ? "" : search;
        return productRepository.search(categoryId, petType, q);
    }

    public Product get(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Produto nao encontrado"));
    }

    @Transactional
    public Product create(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria nao encontrada"));
        Product product = new Product(request.getName(), request.getDescription(), request.getPrice(), request.getStock(), request.getRating(), request.getImageUrl(), request.getPetType(), category);
        return productRepository.save(product);
    }

    @Transactional
    public Product update(Long id, ProductRequest request) {
        Product product = get(id);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria nao encontrada"));
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setRating(request.getRating());
        product.setImageUrl(request.getImageUrl());
        product.setPetType(request.getPetType());
        product.setCategory(category);
        return productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
