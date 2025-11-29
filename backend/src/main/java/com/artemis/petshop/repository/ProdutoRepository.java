package com.artemis.petshop.repository;

import com.artemis.petshop.model.TipoPet;
import com.artemis.petshop.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query("""
            SELECT p FROM Produto p
            WHERE (:categoryId IS NULL OR p.categoria.id = :categoryId)
            AND (:petType IS NULL OR p.tipoPet = :petType)
            AND (LOWER(p.nome) LIKE LOWER(CONCAT('%', :q, '%'))
             OR LOWER(p.descricao) LIKE LOWER(CONCAT('%', :q, '%')))
            """)
    List<Produto> search(@Param("categoryId") Long categoryId, @Param("petType") TipoPet petType, @Param("q") String q);

    long countByCategoriaId(Long categoriaId);
}
