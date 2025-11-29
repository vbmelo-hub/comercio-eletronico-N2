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
    CommandLineRunner seedData(CategoriaRepository categoriaRepository,
                              ProdutoRepository produtoRepository,
                              CupomRepository cupomRepository,
                              UsuarioRepository usuarioRepository,
                              PedidoRepository pedidoRepository) {
        return args -> {
            final String genericCat = "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80";
            final String genericDog = "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80";
            if (categoriaRepository.count() == 0) {
                Categoria racaoDog = categoriaRepository.save(new Categoria("Racao Premium", TipoPet.CAO));
                Categoria racaoCat = categoriaRepository.save(new Categoria("Racao Gatos", TipoPet.GATO));
                Categoria brinquedo = categoriaRepository.save(new Categoria("Brinquedos", TipoPet.ACESSORIO));
                Categoria higiene = categoriaRepository.save(new Categoria("Higiene", TipoPet.ACESSORIO));
                Categoria acessorios = categoriaRepository.save(new Categoria("Acessorios", TipoPet.ACESSORIO));

                produtoRepository.saveAll(List.of(
                        new Produto("Racao Natural Caees 10kg", "Blend natural com omegas, sem corantes e com probiotic os.", BigDecimal.valueOf(189.9), 14, 4.8, genericDog, TipoPet.CAO, racaoDog),
                        new Produto("Racao Indoor Gatos 7kg", "Controle de bolas de pelo, rica em taurina e com baixo sodio.", BigDecimal.valueOf(146.5), 12, 4.7, genericCat, TipoPet.GATO, racaoCat),
                        new Produto("Brinquedo Mordedor", "Borracha atoxica com aroma de menta e cavidades para petiscos.", BigDecimal.valueOf(59.9), 22, 4.6, genericDog, TipoPet.CAO, brinquedo),
                        new Produto("Arranhador Modular", "Arranhador com modulos substituiveis, sisal natural e cama elevada.", BigDecimal.valueOf(219.0), 8, 4.9, genericCat, TipoPet.GATO, brinquedo),
                        new Produto("Kit Banho Calmante", "Shampoo hipoalergenico + spray hidratante sem enxague.", BigDecimal.valueOf(84.9), 18, 4.5, genericCat, TipoPet.ACESSORIO, higiene),
                        new Produto("Caminha Ortopedica", "Espuma de memoria, capa lavavel e base antiderrapante.", BigDecimal.valueOf(239.9), 10, 4.8, genericCat, TipoPet.ACESSORIO, acessorios),
                        new Produto("Coleira Reflexiva Noturna", "Nylon reforcado com tira refletiva e fecho seguro.", BigDecimal.valueOf(69.9), 25, 4.7, genericDog, TipoPet.CAO, acessorios),
                        new Produto("Snack Dental Fresh", "Petisco funcional que reduz placa e deixa o halito fresco.", BigDecimal.valueOf(34.9), 30, 4.4, genericDog, TipoPet.CAO, racaoDog),
                        new Produto("Fonte Hidrata Cat", "Fonte silenciosa com filtro triplo e LED noturno.", BigDecimal.valueOf(139.9), 16, 4.8, genericCat, TipoPet.GATO, acessorios),
                        new Produto("Areia Premium Silica", "Controle de odor prolongado e graos que nao grudam.", BigDecimal.valueOf(74.9), 20, 4.6, genericCat, TipoPet.GATO, higiene),
                        new Produto("Bolinha Inteligente", "Brinquedo interativo que libera petisco ao brincar.", BigDecimal.valueOf(54.9), 28, 4.5, genericDog, TipoPet.CAO, brinquedo),
                        new Produto("Colete Anti-ansiedade", "Tecido respiravel, efeito calmante para passeios.", BigDecimal.valueOf(119.9), 12, 4.3, genericDog, TipoPet.CAO, acessorios),
                        new Produto("Petisco Liofilizado Gato", "100% frango, rico em proteina e sem aditivos.", BigDecimal.valueOf(48.5), 22, 4.7, genericCat, TipoPet.GATO, racaoCat),
                        new Produto("Tapete Higienico Ultra", "Super absorvente, neutraliza odores e tem gel instasec.", BigDecimal.valueOf(89.9), 18, 4.6, genericDog, TipoPet.ACESSORIO, higiene),
                        new Produto("Racao Grain Free Light", "Baixas calorias, sem graos, com proteinas nobres para caes.", BigDecimal.valueOf(199.0), 14, 4.7, genericDog, TipoPet.CAO, racaoDog),
                        new Produto("Racao Indoor Castrados", "Controle de peso e bolas de pelo para gatos castrados.", BigDecimal.valueOf(158.0), 15, 4.8, genericCat, TipoPet.GATO, racaoCat),
                        new Produto("Kit Escova e Pasta Dental", "Cuidados orais diarios para caes e gatos.", BigDecimal.valueOf(45.0), 26, 4.4, genericCat, TipoPet.ACESSORIO, higiene)
                ));
            }

            if (cupomRepository.count() == 0) {
                cupomRepository.save(new Cupom("BEMVINDO", 10, true));
                cupomRepository.save(new Cupom("FRETEGRATIS", 5, false));
            }

            if (usuarioRepository.count() == 0) {
                usuarioRepository.save(new Usuario("Equipe Admin", "admin@petshop.com", "admin123", PapelUsuario.ADMIN));
                usuarioRepository.save(new Usuario("Cliente Demo", "cliente@petshop.com", "cliente123", PapelUsuario.CLIENTE));
            }
        };
    }
}
