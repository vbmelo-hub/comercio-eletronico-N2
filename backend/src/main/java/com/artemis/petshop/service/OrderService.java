package com.artemis.petshop.service;

import com.artemis.petshop.dto.OrderItemRequest;
import com.artemis.petshop.dto.OrderRequest;
import com.artemis.petshop.model.*;
import com.artemis.petshop.repository.CouponRepository;
import com.artemis.petshop.repository.OrderRecordRepository;
import com.artemis.petshop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final ProductRepository productRepository;
    private final CouponRepository couponRepository;
    private final OrderRecordRepository orderRecordRepository;

    public OrderService(ProductRepository productRepository, CouponRepository couponRepository, OrderRecordRepository orderRecordRepository) {
        this.productRepository = productRepository;
        this.couponRepository = couponRepository;
        this.orderRecordRepository = orderRecordRepository;
    }

    @Transactional
    public OrderRecord createOrder(AppUser user, OrderRequest request) {
        List<OrderItem> items = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        for (OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Produto nao encontrado: " + itemReq.getProductId()));
            if (product.getStock() < itemReq.getQuantity()) {
                throw new IllegalArgumentException("Estoque insuficiente para " + product.getName());
            }
            product.setStock(product.getStock() - itemReq.getQuantity());
            productRepository.save(product);
            OrderItem item = new OrderItem(product.getId(), product.getName(), itemReq.getQuantity(), product.getPrice());
            subtotal = subtotal.add(item.getTotal());
            items.add(item);
        }

        Coupon coupon = null;
        BigDecimal discount = BigDecimal.ZERO;
        if (request.getCouponCode() != null && !request.getCouponCode().isBlank()) {
            coupon = couponRepository.findByCodeIgnoreCase(request.getCouponCode())
                    .filter(Coupon::isActive)
                    .orElse(null);
            if (coupon != null) {
                discount = subtotal.multiply(BigDecimal.valueOf(coupon.getDiscountPercent()).divide(BigDecimal.valueOf(100)));
            }
        }

        BigDecimal total = subtotal.subtract(discount);
        Address address = new Address(request.getName(), request.getEmail(), request.getStreet(), request.getCity(), request.getState(), request.getZip());

        OrderRecord order = new OrderRecord(user, items, address, request.getPaymentMethod(), OrderStatus.CONFIRMED, coupon != null ? coupon.getCode() : null, subtotal, discount, total);
        return orderRecordRepository.save(order);
    }

    public List<OrderRecord> listForUser(AppUser user) {
        if (user.getRole() == UserRole.ADMIN) {
            return orderRecordRepository.findAllByOrderByCreatedAtDesc();
        }
        return orderRecordRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }
}
