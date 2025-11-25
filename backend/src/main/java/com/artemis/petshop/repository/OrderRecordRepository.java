package com.artemis.petshop.repository;

import com.artemis.petshop.model.OrderRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRecordRepository extends JpaRepository<OrderRecord, Long> {
    List<OrderRecord> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<OrderRecord> findAllByOrderByCreatedAtDesc();
}
