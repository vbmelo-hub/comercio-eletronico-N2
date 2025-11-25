package com.artemis.petshop.service;

import com.artemis.petshop.dto.CategoryRequest;
import com.artemis.petshop.model.Category;
import com.artemis.petshop.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> list() {
        return categoryRepository.findAll();
    }

    public Category create(CategoryRequest request) {
        Category category = new Category(request.getName(), request.getPetType());
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
