# comercio-eletronico-N2
## Engenharia de Requisitos
### 1. Requisitos funcionais para o cliente
a. Visualizar produtos
> - O cliente deve conseguir ver todos os produtos disponíveis, com foto, preço e descrição.

b. Filtrar produtos por categoria ou tipo de pet
> - Permitir filtrar por cães, gatos, acessórios, brinquedos, rações, etc.

c. Visualizar detalhes do produto
> - Mostrar descrição completa, estoque, preço e avaliações.

d. Adicionar produtos ao carrinho
> - Permitir selecionar quantidade e adicionar ao carrinho.

e. Remover ou alterar quantidade de produtos no carrinho
> - Checkout simulado

f. Preencher dados fictícios de endereço e forma de pagamento.
> - Gerar confirmação do pedido.

g. Login e cadastro de clientes
> - Permitir criar conta e acessar histórico de pedidos.

h. Visualizar histórico de pedidos
> - Mostrar lista de pedidos já realizados com detalhes do pedido.

i. Perfil do pet (opcional)
> - Adicionar e gerenciar informações do pet: nome, idade, raça.


### 2. Requisitos funcionais para o administrador
a. CRUD de produtos
> - Adicionar, editar, remover e listar produtos.

b. Gerenciar categorias de produtos
> - Criar, editar e excluir categorias como “Ração”, “Brinquedos”, “Higiene”.

c. Visualizar pedidos realizados
> - Listar pedidos feitos pelos clientes com detalhes.

d. Gerenciar estoque
> - Atualizar quantidade de produtos disponíveis.

e. Gerenciar cupons de desconto (opcional)
> - Criar e editar cupons aplicáveis no checkout.

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

    Herança
    Usuario <|-- Administrador
    Usuario <|-- Cliente
    Usuario <|-- Veterinario

    Relacionamentos
    Cliente "1" --> "*" Pet : possui
    Cliente "1" --> "*" Pedido : realiza
    Pedido "1" --> "*" ItemPedido : contém
    ItemPedido "*" --> "1" Produto : referente_a
    Veterinario "1" --> "*" Pet : atende
    Pet "1" --> "*" Consulta : possui
