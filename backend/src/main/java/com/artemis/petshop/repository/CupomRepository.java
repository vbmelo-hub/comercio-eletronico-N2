package com.artemis.petshop.repository;

import com.artemis.petshop.model.Cupom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CupomRepository extends JpaRepository<Cupom, Long> {
    Optional<Cupom> findByCodigoIgnoreCase(String codigo);
}
