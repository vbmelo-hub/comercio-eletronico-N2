# comercio-eletronico-N2
## Engenharia de Requisitos
### 1. Requisitos funcionais para o cliente
a. Visualizar produtos  
> - O cliente deve conseguir ver todos os produtos disponiveis, com foto, preco e descricao.

b. Filtrar produtos por categoria ou tipo de pet  
> - Permitir filtrar por caes, gatos, acessorios, brinquedos, racoes, etc.

c. Visualizar detalhes do produto  
> - Mostrar descricao completa, estoque, preco e avaliacoes.

d. Adicionar produtos ao carrinho  
> - Permitir selecionar quantidade e adicionar ao carrinho.

e. Remover ou alterar quantidade de produtos no carrinho  
> - Checkout simulado.

f. Preencher dados ficticios de endereco e forma de pagamento  
> - Gerar confirmacao do pedido.

g. Login e cadastro de clientes  
> - Permitir criar conta e acessar historico de pedidos.

h. Visualizar historico de pedidos  
> - Mostrar lista de pedidos ja realizados com detalhes do pedido.

i. Perfil do pet (opcional)  
> - Adicionar e gerenciar informacoes do pet: nome, idade, raca.

### 2. Requisitos funcionais para o administrador
a. CRUD de produtos  
> - Adicionar, editar, remover e listar produtos.

b. Gerenciar categorias de produtos  
> - Criar, editar e excluir categorias como Racao, Brinquedos, Higiene.

c. Visualizar pedidos realizados  
> - Listar pedidos feitos pelos clientes com detalhes.

d. Gerenciar estoque  
> - Atualizar quantidade de produtos disponiveis.

e. Gerenciar cupons de desconto (opcional)  
> - Criar e editar cupons aplicaveis no checkout.

## Diagrama de classes
    class Usuario {
        -String usuario
        -String senha
        +login(): boolean
        +logout(): void
    }

    class Administrador {
        +adicionarProduto(produto: Produto): void
        +removerProduto(produtoId: int): void
        +atualizarProduto(produto: Produto): void
        +visualizarPedidos(): List~Pedido~
    }

    class Cliente {
        -String nome
        -String sexo
        -Date dataNascimento
        -String email
        +fazerPedido(): Pedido
        +adicionarPet(pet: Pet): void
        +avaliarProduto(produto: Produto, nota: int): void
    }

    class Veterinario {
        -String nome
        -String registro
        -String sexo
        -Date dataNascimento
        +atenderPet(pet: Pet): void
    }

    class Pet {
        -String nome
        -String especie
        -String sexo
        -List~Consulta~ consultas
        +adicionarConsulta(consulta: Consulta): void
    }

    class Produto {
        -int id
        -String nome
        -double preco
        -String categoria
        -int estoque
        +aplicarDesconto(percentual: double): void
    }

    class Pedido {
        -int id
        -Date data
        -double total
        +finalizar(): void
        +calcularTotal(): double
        +adicionarItem(item: ItemPedido): void
    }

    class ItemPedido {
        -int quantidade
        -double subtotal
        -Produto produto
        +calcularSubtotal(): double
    }

    class Consulta {
        -Date data
        -String observacoes
    }

    Heranca
    Usuario <|-- Administrador
    Usuario <|-- Cliente
    Usuario <|-- Veterinario

    Relacionamentos
    Cliente "1" --> "*" Pet : possui
    Cliente "1" --> "*" Pedido : realiza
    Pedido "1" --> "*" ItemPedido : contem
    ItemPedido "*" --> "1" Produto : referente_a
    Veterinario "1" --> "*" Pet : atende
    Pet "1" --> "*" Consulta : possui

---

## Stack implementada (Spring Boot + Angular)
- Backend: `backend/` com Spring Boot 3, usando banco MySQL real. O schema deve existir previamente; o Hibernate apenas valida (`ddl-auto=validate`) e falha se algo estiver diferente. Endpoints REST para catalogo, auth, carrinho/pedidos e painel admin (CRUD produtos/categorias/cupons e listagem de pedidos). Login retorna token em `X-Auth-Token`. Seeds iniciais criados em `DataInitializer` apenas quando o banco esta vazio.
- Frontend: `frontend/` com Angular standalone (abas: Catalogo, Carrinho, Pedidos, Perfil/Pets, Admin). Consome a API; guarda token/carrinho em localStorage; fluxo completo de compra simulado.

### Banco de dados MySQL
- Banco `petshop` deve ser criado manualmente no MySQL (as tabelas tambem).
- A aplicacao nao cria nem altera tabelas. Se algo estiver diferente do esperado, sobe com erro por causa do `ddl-auto=validate`.
- Configuracao padrao: `jdbc:mysql://localhost:3306/petshop`, usuario `petshop`, senha `petshop`.
- Para alterar credenciais/URL use variaveis de ambiente: `DB_URL`, `DB_USER`, `DB_PASS`.

### Como rodar
1) Crie o banco `petshop` e todas as tabelas/colunas no MySQL (via Workbench/SQL).
2) Opcional: exporte `DB_URL`, `DB_USER`, `DB_PASS` se nao for usar o padrao.
3) Backend:
   ```
   cd backend
   mvn spring-boot:run
   ```
   API em `http://localhost:8080/api`.
4) Frontend:
   ```
   cd frontend
   npm install
   npm start
   ```
   App em `http://localhost:4200` consumindo a API.

Credenciais admin: `admin@petshop.com / admin123`. Cliente demo: `cliente@petshop.com / cliente123`.
