package com.artemis.petshop.config;

import com.artemis.petshop.model.Categoria;
import com.artemis.petshop.model.Cupom;
import com.artemis.petshop.model.PapelUsuario;
import com.artemis.petshop.model.Produto;
import com.artemis.petshop.model.TipoPet;
import com.artemis.petshop.model.Usuario;
import com.artemis.petshop.repository.CategoriaRepository;
import com.artemis.petshop.repository.CupomRepository;
import com.artemis.petshop.repository.PedidoRepository;
import com.artemis.petshop.repository.ProdutoRepository;
import com.artemis.petshop.repository.UsuarioRepository;
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
            final String racaoDogImg = "https://images.unsplash.com/photo-1589463529286-21f8b154bdd0?auto=format&fit=crop&w=800&q=80";
            final String racaoCatImg = "https://images.unsplash.com/photo-1558944351-c7e7d6f1a14a?auto=format&fit=crop&w=800&q=80";
            final String brinquedoMordedorImg = "https://images.unsplash.com/photo-1626337928254-287a1b6b1c2c?auto=format&fit=crop&w=800&q=80";
            final String arranhadorImg = "https://images.unsplash.com/photo-1601758062965-6ec2ef64a1c2?auto=format&fit=crop&w=800&q=80";
            final String kitBanhoImg = "https://images.unsplash.com/photo-1617032238119-296d7731ea40?auto=format&fit=crop&w=800&q=80";
            final String caminhaImg = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80";
            final String coleiraReflexivaImg = "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=800&q=80";
            final String snackDentalImg = "https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=800&q=80";
            final String fonteGatosImg = "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=800&q=80";
            final String areiaSilicaImg = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80";
            final String bolinhaInteligenteImg = "https://images.unsplash.com/photo-1582719478248-54e9f2afbc98?auto=format&fit=crop&w=800&q=80";
            final String coleteAnsiedadeImg = "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80";
            final String petiscoGatoImg = "https://images.unsplash.com/photo-1587554801395-0340b9e559e9?auto=format&fit=crop&w=800&q=80";
            final String tapeteHigienicoImg = "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=800&q=80";
            final String racaoGrainFreeImg = "https://images.unsplash.com/photo-1596496050301-0d79d2fd1f1f?auto=format&fit=crop&w=800&q=80";
            final String racaoIndoorCastradosImg = "https://images.unsplash.com/photo-1545243424-0ce743321e11?auto=format&fit=crop&w=800&q=80";
            final String kitEscovaImg = "https://images.unsplash.com/photo-1601758065894-6ec2ef64a1c2?auto=format&fit=crop&w=800&q=80";

            boolean hasSeedData = categoriaRepository.count() > 0
                    || produtoRepository.count() > 0
                    || cupomRepository.count() > 0
                    || usuarioRepository.count() > 0
                    || pedidoRepository.count() > 0;

            if (hasSeedData) {
                return;
            }

            Categoria racaoDog = categoriaRepository.save(new Categoria("Racao Premium", TipoPet.CAO));
            Categoria racaoCat = categoriaRepository.save(new Categoria("Racao Gatos", TipoPet.GATO));
            Categoria brinquedo = categoriaRepository.save(new Categoria("Brinquedos", TipoPet.ACESSORIO));
            Categoria higiene = categoriaRepository.save(new Categoria("Higiene", TipoPet.ACESSORIO));
            Categoria acessorios = categoriaRepository.save(new Categoria("Acessorios", TipoPet.ACESSORIO));

            produtoRepository.saveAll(List.of(
                    new Produto("Biofresh Natural 10 kg", "Blend natural com omegas, sem corantes e com probiotic os.", BigDecimal.valueOf(189.9), 14, 4.8, racaoDogImg, TipoPet.CAO, racaoDog),
                    new Produto("Premier Ambientes Internos 7 kg", "Controle de bolas de pelo, rica em taurina e com baixo sodio.", BigDecimal.valueOf(146.5), 12, 4.7, racaoCatImg, TipoPet.GATO, racaoCat),
                    new Produto("Mordedor de Borracha Aromático", "Borracha atoxica com aroma de menta e cavidades para petiscos.", BigDecimal.valueOf(59.9), 22, 4.6, brinquedoMordedorImg, TipoPet.CAO, brinquedo),
                    new Produto("Arranhador Modular Sisal", "Arranhador com modulos substituiveis, sisal natural e cama elevada.", BigDecimal.valueOf(219.0), 8, 4.9, arranhadorImg, TipoPet.GATO, brinquedo),
                    new Produto("Kit Banho Calmante Pet Society", "Shampoo hipoalergenico + spray hidratante sem enxague.", BigDecimal.valueOf(84.9), 18, 4.5, kitBanhoImg, TipoPet.ACESSORIO, higiene),
                    new Produto("Caminha Ortopédica Comfort", "Espuma de memoria, capa lavavel e base antiderrapante.", BigDecimal.valueOf(239.9), 10, 4.8, caminhaImg, TipoPet.ACESSORIO, acessorios),
                    new Produto("Coleira Refletiva Noturna", "Nylon reforcado com tira refletiva e fecho seguro.", BigDecimal.valueOf(69.9), 25, 4.7, coleiraReflexivaImg, TipoPet.CAO, acessorios),
                    new Produto("Snack Dental Fresh", "Petisco funcional que reduz placa e deixa o halito fresco.", BigDecimal.valueOf(34.9), 30, 4.4, snackDentalImg, TipoPet.CAO, racaoDog),
                    new Produto("Fonte Bebedouro LED Triplo", "Fonte silenciosa com filtro triplo e LED noturno.", BigDecimal.valueOf(139.9), 16, 4.8, fonteGatosImg, TipoPet.GATO, acessorios),
                    new Produto("Areia de Sílica Premium", "Controle de odor prolongado e graos que nao grudam.", BigDecimal.valueOf(74.9), 20, 4.6, areiaSilicaImg, TipoPet.GATO, higiene),
                    new Produto("Bolinha Interativa com Som", "Brinquedo interativo que libera petisco ao brincar.", BigDecimal.valueOf(54.9), 28, 4.5, bolinhaInteligenteImg, TipoPet.CAO, brinquedo),
                    new Produto("Colete Calmante Antiansiedade", "Tecido respiravel, efeito calmante para passeios.", BigDecimal.valueOf(119.9), 12, 4.3, coleteAnsiedadeImg, TipoPet.CAO, acessorios),
                    new Produto("Petisco Liofilizado 100% Frango", "100% frango, rico em proteina e sem aditivos.", BigDecimal.valueOf(48.5), 22, 4.7, petiscoGatoImg, TipoPet.GATO, racaoCat),
                    new Produto("Tapete Higiênico Ultra Absorvente", "Super absorvente, neutraliza odores e tem gel instasec.", BigDecimal.valueOf(89.9), 18, 4.6, tapeteHigienicoImg, TipoPet.ACESSORIO, higiene),
                    new Produto("GranPlus Grain Free Light", "Baixas calorias, sem graos, com proteinas nobres para caes.", BigDecimal.valueOf(199.0), 14, 4.7, racaoGrainFreeImg, TipoPet.CAO, racaoDog),
                    new Produto("Golden Castrados Controle de Peso", "Controle de peso e bolas de pelo para gatos castrados.", BigDecimal.valueOf(158.0), 15, 4.8, racaoIndoorCastradosImg, TipoPet.GATO, racaoCat),
                    new Produto("Kit Escova + Pasta Dental", "Cuidados orais diarios para caes e gatos.", BigDecimal.valueOf(45.0), 26, 4.4, kitEscovaImg, TipoPet.ACESSORIO, higiene)
            ));

            cupomRepository.save(new Cupom("BEMVINDO", 10, true));
            cupomRepository.save(new Cupom("FRETEGRATIS", 5, false));

            usuarioRepository.save(new Usuario("Equipe Admin", "admin@petshop.com", "admin123", PapelUsuario.ADMIN));
            usuarioRepository.save(new Usuario("Cliente Demo", "cliente@petshop.com", "cliente123", PapelUsuario.CLIENTE));
            usuarioRepository.save(new Usuario("Usuario Comum", "usuario@gmail.com", "1234", PapelUsuario.CLIENTE));
        };
    }
}
