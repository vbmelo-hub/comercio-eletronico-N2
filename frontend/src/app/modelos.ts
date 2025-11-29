export type TipoPet = 'CAO' | 'GATO' | 'ACESSORIO';
export type MetodoPagamento = 'CARTAO_CREDITO' | 'PIX' | 'BOLETO' | 'DINHEIRO' | 'CARTAO_ENTREGA' | 'CARTAO_RETIRADA';
export type StatusPedido = 'CONFIRMADO' | 'PROCESSANDO' | 'ENVIADO' | 'CANCELADO';

export interface Categoria {
  id: number;
  nome: string;
  tipoPet: TipoPet;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  avaliacao: number;
  urlImagem: string;
  tipoPet: TipoPet;
  categoria: Categoria;
}

export interface Cupom {
  id: number;
  codigo: string;
  percentualDesconto: number;
  ativo: boolean;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  papel: 'ADMIN' | 'CLIENTE';
  pets: PerfilPet[];
}

export interface PerfilPet {
  nome: string;
  idade?: string;
  raca?: string;
}

export interface RespostaAuth {
  token: string;
  usuarioId: number;
  nome: string;
  email: string;
  papel: 'ADMIN' | 'CLIENTE';
}

export interface ItemPedidoRequisicao {
  produtoId: number;
  quantidade: number;
}

export interface PedidoRequisicao {
  itens: ItemPedidoRequisicao[];
  codigoCupom?: string;
  metodoPagamento: MetodoPagamento;
  nome: string;
  email: string;
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  retirada: boolean;
}

export interface ItemPedido {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  preco: number;
  total: number;
}

export interface Pedido {
  id: number;
  usuario: Usuario;
  itens: ItemPedido[];
  endereco: {
    nome: string;
    email: string;
    rua: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  metodoPagamento: MetodoPagamento;
  status: StatusPedido;
  codigoCupom?: string;
  subtotal: number;
  desconto: number;
  total: number;
  codigoPagamento?: string;
  retirada?: boolean;
  criadoEm: string;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}
