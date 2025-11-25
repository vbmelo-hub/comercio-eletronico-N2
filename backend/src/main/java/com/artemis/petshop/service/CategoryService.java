package com.artemis.petshop.service;

import com.artemis.petshop.dto.CategoryRequest;
import com.artemis.petshop.model.Category;
import com.artemis.petshop.repository.CategoryRepository;
import com.artemis.petshop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    public List<Category> list() {
        return categoryRepository.findAll();
    }

    public Category create(CategoryRequest request) {
        Category category = new Category(request.getName(), request.getPetType());
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        long bound = productRepository.countByCategoryId(id);
        if (bound > 0) {
            throw new IllegalArgumentException("Categoria possui produtos cadastrados. Remova ou recategorize os produtos antes de excluir.");
        }
        categoryRepository.deleteById(id);
    }
}
