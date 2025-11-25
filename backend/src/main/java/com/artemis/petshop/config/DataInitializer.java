package com.artemis.petshop.config;

import com.artemis.petshop.model.*;
import com.artemis.petshop.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedData(CategoryRepository categoryRepository,
                              ProductRepository productRepository,
                              CouponRepository couponRepository,
                              UserRepository userRepository,
                              OrderRecordRepository orderRecordRepository) {
        return args -> {
            if (categoryRepository.count() == 0) {
                Category racaoDog = categoryRepository.save(new Category("Racao Premium", PetType.DOG));
                Category racaoCat = categoryRepository.save(new Category("Racao Gatos", PetType.CAT));
                Category brinquedo = categoryRepository.save(new Category("Brinquedos", PetType.ACCESSORY));
                Category higiene = categoryRepository.save(new Category("Higiene", PetType.ACCESSORY));
                Category acessorios = categoryRepository.save(new Category("Acessorios", PetType.ACCESSORY));

                productRepository.saveAll(List.of(
                        new Product("Racao Natural Caees 10kg", "Blend natural com omegas, sem corantes e com probiotic os.", BigDecimal.valueOf(189.9), 14, 4.8, "https://images.unsplash.com/photo-1543857261-77de430d2478?auto=format&fit=crop&w=800&q=80", PetType.DOG, racaoDog),
                        new Product("Racao Indoor Gatos 7kg", "Controle de bolas de pelo, rica em taurina e com baixo sodio.", BigDecimal.valueOf(146.5), 12, 4.7, "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=800&q=80", PetType.CAT, racaoCat),
                        new Product("Brinquedo Mordedor", "Borracha atoxica com aroma de menta e cavidades para petiscos.", BigDecimal.valueOf(59.9), 22, 4.6, "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80", PetType.DOG, brinquedo),
                        new Product("Arranhador Modular", "Arranhador com modulos substituiveis, sisal natural e cama elevada.", BigDecimal.valueOf(219.0), 8, 4.9, "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80", PetType.CAT, brinquedo),
                        new Product("Kit Banho Calmante", "Shampoo hipoalergenico + spray hidratante sem enxague.", BigDecimal.valueOf(84.9), 18, 4.5, "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80", PetType.ACCESSORY, higiene),
                        new Product("Caminha Ortopedica", "Espuma de memoria, capa lavavel e base antiderrapante.", BigDecimal.valueOf(239.9), 10, 4.8, "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80", PetType.ACCESSORY, acessorios)
                ));
            }

            if (couponRepository.count() == 0) {
                couponRepository.save(new Coupon("BEMVINDO", 10, true));
                couponRepository.save(new Coupon("FRETEGRATIS", 5, false));
            }

            if (userRepository.count() == 0) {
                userRepository.save(new AppUser("Equipe Admin", "admin@petshop.com", "admin123", UserRole.ADMIN));
                userRepository.save(new AppUser("Cliente Demo", "cliente@petshop.com", "cliente123", UserRole.CUSTOMER));
            }
        };
    }
}
