package com.artemis.petshop.service;

import com.artemis.petshop.dto.ItemPedidoRequisicao;
import com.artemis.petshop.dto.PedidoRequisicao;
import com.artemis.petshop.model.*;
import com.artemis.petshop.repository.CupomRepository;
import com.artemis.petshop.repository.PedidoRepository;
import com.artemis.petshop.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.time.Instant;

@Service
public class PedidoService {
    private final ProdutoRepository produtoRepository;
    private final CupomRepository cupomRepository;
    private final PedidoRepository pedidoRepository;

    public PedidoService(ProdutoRepository produtoRepository, CupomRepository cupomRepository, PedidoRepository pedidoRepository) {
        this.produtoRepository = produtoRepository;
        this.cupomRepository = cupomRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Transactional
    public Pedido createOrder(Usuario usuario, PedidoRequisicao requisicao) {
        if (requisicao == null || requisicao.getItens() == null || requisicao.getItens().isEmpty()) {
            throw new IllegalArgumentException("Carrinho vazio");
        }
        if (requisicao.getMetodoPagamento() == null) {
            throw new IllegalArgumentException("Selecione um meio de pagamento");
        }
        if (requisicao.getNome() == null || requisicao.getNome().isBlank()) {
            throw new IllegalArgumentException("Informe o nome");
        }
        if (requisicao.getEmail() == null || requisicao.getEmail().isBlank()) {
            throw new IllegalArgumentException("Informe o email");
        }
        List<ItemPedido> itens = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        for (ItemPedidoRequisicao itemReq : requisicao.getItens()) {
            Produto produto = produtoRepository.findById(itemReq.getProdutoId())
                    .orElseThrow(() -> new IllegalArgumentException("Produto nao encontrado: " + itemReq.getProdutoId()));
            if (produto.getEstoque() < itemReq.getQuantidade()) {
                throw new IllegalArgumentException("Estoque insuficiente para " + produto.getNome());
            }
            produto.setEstoque(produto.getEstoque() - itemReq.getQuantidade());
            produtoRepository.save(produto);
            ItemPedido item = new ItemPedido(produto.getId(), produto.getNome(), itemReq.getQuantidade(), produto.getPreco());
            subtotal = subtotal.add(item.getTotal());
            itens.add(item);
        }

        Cupom cupom = null;
        BigDecimal desconto = BigDecimal.ZERO;
        if (requisicao.getCodigoCupom() != null && !requisicao.getCodigoCupom().isBlank()) {
            cupom = cupomRepository.findByCodigoIgnoreCase(requisicao.getCodigoCupom())
                    .filter(Cupom::isAtivo)
                    .orElse(null);
            if (cupom != null) {
                desconto = subtotal.multiply(BigDecimal.valueOf(cupom.getPercentualDesconto()).divide(BigDecimal.valueOf(100)));
            }
        }

        BigDecimal total = subtotal.subtract(desconto);
        boolean retirada = requisicao.isRetirada();
        if (!retirada) {
            if (requisicao.getRua() == null || requisicao.getRua().isBlank()
                    || requisicao.getCidade() == null || requisicao.getCidade().isBlank()
                    || requisicao.getEstado() == null || requisicao.getEstado().isBlank()
                    || requisicao.getCep() == null || requisicao.getCep().isBlank()) {
                throw new IllegalArgumentException("Endereco completo obrigatorio para entrega");
            }
            total = total.add(BigDecimal.valueOf(15)); // taxa de entrega
        }
        Endereco endereco = new Endereco(
                requisicao.getNome(),
                requisicao.getEmail(),
                requisicao.getRua() == null ? "" : requisicao.getRua(),
                requisicao.getCidade() == null ? "" : requisicao.getCidade(),
                requisicao.getEstado() == null ? "" : requisicao.getEstado(),
                requisicao.getCep() == null ? "" : requisicao.getCep());

        String codigoPagamento;
        if (requisicao.getMetodoPagamento() == MetodoPagamento.PIX) {
            codigoPagamento = "pix@artemispets.com";
        } else if (requisicao.getMetodoPagamento() == MetodoPagamento.BOLETO) {
            codigoPagamento = "34191." + Instant.now().toEpochMilli();
        } else if (requisicao.getMetodoPagamento() == MetodoPagamento.DINHEIRO) {
            codigoPagamento = "PAGAR-NA-ENTREGA";
        } else if (requisicao.getMetodoPagamento() == MetodoPagamento.CARTAO_ENTREGA
                || requisicao.getMetodoPagamento() == MetodoPagamento.CARTAO_RETIRADA
                || requisicao.getMetodoPagamento() == MetodoPagamento.CARTAO_CREDITO) {
            codigoPagamento = "CARTAO-LOCAL";
        } else {
            codigoPagamento = "";
        }

        Pedido pedido = new Pedido(usuario, itens, endereco, requisicao.getMetodoPagamento(), StatusPedido.CONFIRMADO, cupom != null ? cupom.getCodigo() : null, subtotal, desconto, total);
        pedido.setRetirada(retirada);
        pedido.setCodigoPagamento(codigoPagamento);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listForUser(Usuario usuario) {
        if (usuario != null && usuario.getPapel() == PapelUsuario.ADMIN) {
            return pedidoRepository.findAllByOrderByCriadoEmDesc();
        }
        if (usuario == null) {
            return List.of();
        }
        return pedidoRepository.findByUsuarioIdOrderByCriadoEmDesc(usuario.getId());
    }

    @Transactional
    public Pedido atualizarStatus(Long id, StatusPedido status) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido não encontrado: " + id));
        pedido.setStatus(status);
        return pedidoRepository.save(pedido);
    }
}
