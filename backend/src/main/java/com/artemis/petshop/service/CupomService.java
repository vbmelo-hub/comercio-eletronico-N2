package com.artemis.petshop.service;

import com.artemis.petshop.dto.CupomRequisicao;
import com.artemis.petshop.model.Cupom;
import com.artemis.petshop.repository.CupomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CupomService {
    private final CupomRepository cupomRepository;

    public CupomService(CupomRepository cupomRepository) {
        this.cupomRepository = cupomRepository;
    }

    public List<Cupom> list() {
        return cupomRepository.findAll();
    }

    public Cupom save(CupomRequisicao requisicao) {
        Cupom cupom = cupomRepository.findByCodigoIgnoreCase(requisicao.getCodigo()).orElse(new Cupom());
        cupom.setCodigo(requisicao.getCodigo().toUpperCase());
        cupom.setPercentualDesconto(requisicao.getPercentualDesconto());
        cupom.setAtivo(requisicao.isAtivo());
        return cupomRepository.save(cupom);
    }

    public Cupom findActive(String codigo) {
        return cupomRepository.findByCodigoIgnoreCase(codigo)
                .filter(Cupom::isAtivo)
                .orElse(null);
    }
}
