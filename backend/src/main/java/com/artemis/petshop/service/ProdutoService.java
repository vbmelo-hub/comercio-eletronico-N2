package com.artemis.petshop.service;

import com.artemis.petshop.dto.ProdutoRequisicao;
import com.artemis.petshop.model.Categoria;
import com.artemis.petshop.model.Produto;
import com.artemis.petshop.model.TipoPet;
import com.artemis.petshop.repository.CategoriaRepository;
import com.artemis.petshop.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Produto> list(Long categoriaId, TipoPet tipoPet, String busca) {
        String q = busca == null ? "" : busca;
        return produtoRepository.search(categoriaId, tipoPet, q);
    }

    public Produto get(Long id) {
        return produtoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Produto nao encontrado"));
    }

    @Transactional
    public Produto create(ProdutoRequisicao requisicao) {
        Categoria categoria = categoriaRepository.findById(requisicao.getCategoriaId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria nao encontrada"));
        Produto produto = new Produto(requisicao.getNome(), requisicao.getDescricao(), requisicao.getPreco(), requisicao.getEstoque(), requisicao.getAvaliacao(), requisicao.getUrlImagem(), requisicao.getTipoPet(), categoria);
        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto update(Long id, ProdutoRequisicao requisicao) {
        Produto produto = get(id);
        Categoria categoria = categoriaRepository.findById(requisicao.getCategoriaId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria nao encontrada"));
        produto.setNome(requisicao.getNome());
        produto.setDescricao(requisicao.getDescricao());
        produto.setPreco(requisicao.getPreco());
        produto.setEstoque(requisicao.getEstoque());
        produto.setAvaliacao(requisicao.getAvaliacao());
        produto.setUrlImagem(requisicao.getUrlImagem());
        produto.setTipoPet(requisicao.getTipoPet());
        produto.setCategoria(categoria);
        return produtoRepository.save(produto);
    }

    public void delete(Long id) {
        produtoRepository.deleteById(id);
    }
}
