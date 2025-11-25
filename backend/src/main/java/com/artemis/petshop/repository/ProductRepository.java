package com.artemis.petshop.repository;

import com.artemis.petshop.model.Product;
import com.artemis.petshop.model.PetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select p from Product p where (:categoryId is null or p.category.id = :categoryId) and (:petType is null or p.petType = :petType) and (lower(p.name) like lower(concat('%',:q,'%')) or lower(p.description) like lower(concat('%',:q,'%')))")
    List<Product> search(@Param("categoryId") Long categoryId, @Param("petType") PetType petType, @Param("q") String query);
}
