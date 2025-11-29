package com.artemis.petshop.service;

import com.artemis.petshop.dto.CategoriaRequisicao;
import com.artemis.petshop.model.Categoria;
import com.artemis.petshop.repository.CategoriaRepository;
import com.artemis.petshop.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    private final ProdutoRepository produtoRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, ProdutoRepository produtoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.produtoRepository = produtoRepository;
    }

    public List<Categoria> list() {
        return categoriaRepository.findAll();
    }

    public Categoria create(CategoriaRequisicao requisicao) {
        Categoria categoria = new Categoria(requisicao.getNome(), requisicao.getTipoPet());
        return categoriaRepository.save(categoria);
    }

    public void delete(Long id) {
        long bound = produtoRepository.countByCategoriaId(id);
        if (bound > 0) {
            throw new IllegalArgumentException("Categoria possui produtos cadastrados. Remova ou recategorize os produtos antes de excluir.");
        }
        categoriaRepository.deleteById(id);
    }
}
