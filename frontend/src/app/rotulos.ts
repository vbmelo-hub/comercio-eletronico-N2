import { StatusPedido, MetodoPagamento, TipoPet, Usuario } from './modelos';

const petTypeLabels: Record<TipoPet, string> = {
  CAO: 'Caes',
  GATO: 'Gatos',
  ACESSORIO: 'Acessorios'
};

const paymentMethodLabels: Record<MetodoPagamento, string> = {
  CARTAO_CREDITO: 'Cartao de credito',
  PIX: 'PIX',
  BOLETO: 'Boleto',
  DINHEIRO: 'Dinheiro'
};

const orderStatusLabels: Record<StatusPedido, string> = {
  CONFIRMADO: 'Confirmado',
  PROCESSANDO: 'Processando',
  ENVIADO: 'Enviado',
  CANCELADO: 'Cancelado'
};

const roleLabels: Record<Usuario['papel'], string> = {
  ADMIN: 'Administrador',
  CLIENTE: 'Cliente'
};

export function labelPetType(type?: TipoPet | null): string {
  if (!type) return '';
  return petTypeLabels[type] ?? type;
}

export function labelPaymentMethod(method?: MetodoPagamento | null): string {
  if (!method) return '';
  return paymentMethodLabels[method] ?? method;
}

export function labelOrderStatus(status?: StatusPedido | null): string {
  if (!status) return '';
  return orderStatusLabels[status] ?? status;
}

export function labelUserRole(role?: Usuario['papel'] | null): string {
  if (!role) return '';
  return roleLabels[role] ?? role;
}
