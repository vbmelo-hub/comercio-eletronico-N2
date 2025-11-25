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
            final String genericCat = "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80";
            final String genericDog = "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80";
            if (categoryRepository.count() == 0) {
                Category racaoDog = categoryRepository.save(new Category("Racao Premium", PetType.DOG));
                Category racaoCat = categoryRepository.save(new Category("Racao Gatos", PetType.CAT));
                Category brinquedo = categoryRepository.save(new Category("Brinquedos", PetType.ACCESSORY));
                Category higiene = categoryRepository.save(new Category("Higiene", PetType.ACCESSORY));
                Category acessorios = categoryRepository.save(new Category("Acessorios", PetType.ACCESSORY));

                productRepository.saveAll(List.of(
                        new Product("Racao Natural Caees 10kg", "Blend natural com omegas, sem corantes e com probiotic os.", BigDecimal.valueOf(189.9), 14, 4.8, genericDog, PetType.DOG, racaoDog),
                        new Product("Racao Indoor Gatos 7kg", "Controle de bolas de pelo, rica em taurina e com baixo sodio.", BigDecimal.valueOf(146.5), 12, 4.7, genericCat, PetType.CAT, racaoCat),
                        new Product("Brinquedo Mordedor", "Borracha atoxica com aroma de menta e cavidades para petiscos.", BigDecimal.valueOf(59.9), 22, 4.6, genericDog, PetType.DOG, brinquedo),
                        new Product("Arranhador Modular", "Arranhador com modulos substituiveis, sisal natural e cama elevada.", BigDecimal.valueOf(219.0), 8, 4.9, genericCat, PetType.CAT, brinquedo),
                        new Product("Kit Banho Calmante", "Shampoo hipoalergenico + spray hidratante sem enxague.", BigDecimal.valueOf(84.9), 18, 4.5, genericCat, PetType.ACCESSORY, higiene),
                        new Product("Caminha Ortopedica", "Espuma de memoria, capa lavavel e base antiderrapante.", BigDecimal.valueOf(239.9), 10, 4.8, genericCat, PetType.ACCESSORY, acessorios),
                        new Product("Coleira Reflexiva Noturna", "Nylon reforcado com tira refletiva e fecho seguro.", BigDecimal.valueOf(69.9), 25, 4.7, genericDog, PetType.DOG, acessorios),
                        new Product("Snack Dental Fresh", "Petisco funcional que reduz placa e deixa o hálito fresco.", BigDecimal.valueOf(34.9), 30, 4.4, genericDog, PetType.DOG, racaoDog),
                        new Product("Fonte Hidrata Cat", "Fonte silenciosa com filtro triplo e LED noturno.", BigDecimal.valueOf(139.9), 16, 4.8, genericCat, PetType.CAT, acessorios),
                        new Product("Areia Premium Silica", "Controle de odor prolongado e grãos que não grudam.", BigDecimal.valueOf(74.9), 20, 4.6, genericCat, PetType.CAT, higiene),
                        new Product("Bolinha Inteligente", "Brinquedo interativo que libera petisco ao brincar.", BigDecimal.valueOf(54.9), 28, 4.5, genericDog, PetType.DOG, brinquedo),
                        new Product("Colete Anti-ansiedade", "Tecido respirável, efeito calmante para passeios.", BigDecimal.valueOf(119.9), 12, 4.3, genericDog, PetType.DOG, acessorios),
                        new Product("Petisco Liofilizado Gato", "100% frango, rico em proteína e sem aditivos.", BigDecimal.valueOf(48.5), 22, 4.7, genericCat, PetType.CAT, racaoCat),
                        new Product("Tapete Higiênico Ultra", "Super absorvente, neutraliza odores e tem gel instasec.", BigDecimal.valueOf(89.9), 18, 4.6, genericDog, PetType.ACCESSORY, higiene),
                        new Product("Ração Grain Free Light", "Baixas calorias, sem grãos, com proteínas nobres para cães.", BigDecimal.valueOf(199.0), 14, 4.7, genericDog, PetType.DOG, racaoDog),
                        new Product("Ração Indoor Castrados", "Controle de peso e bolas de pelo para gatos castrados.", BigDecimal.valueOf(158.0), 15, 4.8, genericCat, PetType.CAT, racaoCat),
                        new Product("Kit Escova e Pasta Dental", "Cuidados orais diários para cães e gatos.", BigDecimal.valueOf(45.0), 26, 4.4, genericCat, PetType.ACCESSORY, higiene)
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
