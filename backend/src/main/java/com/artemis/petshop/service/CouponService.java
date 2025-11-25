package com.artemis.petshop.service;

import com.artemis.petshop.dto.CouponRequest;
import com.artemis.petshop.model.Coupon;
import com.artemis.petshop.repository.CouponRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouponService {
    private final CouponRepository couponRepository;

    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public List<Coupon> list() {
        return couponRepository.findAll();
    }

    public Coupon save(CouponRequest request) {
        Coupon coupon = couponRepository.findByCodeIgnoreCase(request.getCode()).orElse(new Coupon());
        coupon.setCode(request.getCode().toUpperCase());
        coupon.setDiscountPercent(request.getDiscountPercent());
        coupon.setActive(request.isActive());
        return couponRepository.save(coupon);
    }

    public Coupon findActive(String code) {
        return couponRepository.findByCodeIgnoreCase(code)
                .filter(Coupon::isActive)
                .orElse(null);
    }
}
