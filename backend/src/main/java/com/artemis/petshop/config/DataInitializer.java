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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

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
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return args -> {
            final String racaoDogImg = "https://plus.unsplash.com/premium_photo-1726761692986-6bcde87fc2b8?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String racaoCatImg = "https://plus.unsplash.com/premium_photo-1726761692986-6bcde87fc2b8?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String brinquedoMordedorImg = "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

            final String arranhadorImg = "https://media.istockphoto.com/id/537726994/pt/foto/bonitos-gatinho-numa-arranhador-para-gato-isolado-no-branco.jpg?s=2048x2048&w=is&k=20&c=DSxQIgJIcJBcR3CLqiGN21Xj1vqTFG_jCa817ilsUAY=";
            final String kitBanhoImg = "https://media.istockphoto.com/id/1570674801/pt/foto/funny-cute-baby-dog-bathes-in-bathtub-with-rubber-toy-duck-in-foam-soap-bubble.jpg?s=2048x2048&w=is&k=20&c=RyqknQMb5FmuXBO1-8y6m4BAQFBGQqEwiGSw2KdddFU=";
            final String caminhaImg = "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String coleiraReflexivaImg = "https://media.istockphoto.com/id/1027876184/pt/foto/dog-walking-in-the-city.jpg?s=2048x2048&w=is&k=20&c=B8ZCKCabS_yI8xACyALsS93XPupnviS4LNC4-FOYbRY=";
            final String snackDentalImg = "https://images.unsplash.com/photo-1746513230312-83b1e7629e83?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String fonteGatosImg = "https://images.unsplash.com/photo-1764741368227-38ac9fd670a2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String areiaSilicaImg = "https://media.istockphoto.com/id/1315441226/pt/foto/valentines-day-heart-gift-from-bengal-cat-the-cat-expresses-its-love.jpg?s=2048x2048&w=is&k=20&c=wkofAQ8Wh9Ckc1YLNdEgt2EOtahFyiIgF_5t_naSWrk=";
            final String bolinhaInteligenteImg = "https://images.unsplash.com/photo-1608743839000-50a0aa35e979?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String coleteAnsiedadeImg = "https://images.unsplash.com/photo-1761532907528-85579a5c2e00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String petiscoGatoImg = "https://images.unsplash.com/photo-1592468257342-8375cb556a69?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String tapeteHigienicoImg = "https://images.unsplash.com/photo-1542178623-549d77f5262e?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String racaoGrainFreeImg = "https://plus.unsplash.com/premium_photo-1726761692986-6bcde87fc2b8?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String racaoIndoorCastradosImg = "https://plus.unsplash.com/premium_photo-1726761692986-6bcde87fc2b8?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            final String kitEscovaImg = "https://media.istockphoto.com/id/1814702073/pt/foto/groomer-brushing-corgi-dog-with-a-slicker-brush-cute-pembroke-welsh-corgi-puppy-enjoys-being.jpg?s=1024x1024&w=is&k=20&c=AHxnKEN7E-q4ip8S9wV7eZcybChs3ykv0B2Q91b8JIg=";

            boolean hasSeedData = categoriaRepository.count() > 0
                    || produtoRepository.count() > 0
                    || cupomRepository.count() > 0
                    || usuarioRepository.count() > 0
                    || pedidoRepository.count() > 0;

            if (hasSeedData) {
                updateProdutoImagem(produtoRepository, "Biofresh Natural 10 kg", racaoDogImg);
                updateProdutoImagem(produtoRepository, "Premier Ambientes Internos 7 kg", racaoCatImg);
                updateProdutoImagem(produtoRepository, "Mordedor de Borracha Aromケtico", brinquedoMordedorImg);
                updateProdutoImagem(produtoRepository, "Arranhador Modular Sisal", arranhadorImg);
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

            usuarioRepository.save(new Usuario("Equipe Admin", "admin@petshop.com", passwordEncoder.encode("admin123"), PapelUsuario.ADMIN));
            usuarioRepository.save(new Usuario("Cliente Demo", "cliente@petshop.com", passwordEncoder.encode("cliente123"), PapelUsuario.CLIENTE));
            usuarioRepository.save(new Usuario("Usuario Comum", "usuario@gmail.com", passwordEncoder.encode("1234"), PapelUsuario.CLIENTE));
        };
    }

    private void updateProdutoImagem(ProdutoRepository produtoRepository, String nome, String novaUrl) {
        produtoRepository.findByNome(nome).ifPresent(produto -> {
            produto.setUrlImagem(novaUrl);
            produtoRepository.save(produto);
        });
    }
}
