import { OrderStatus, PaymentMethod, PetType, User } from './models';

const petTypeLabels: Record<PetType, string> = {
  DOG: 'Caes',
  CAT: 'Gatos',
  ACCESSORY: 'Acessorios'
};

const paymentMethodLabels: Record<PaymentMethod, string> = {
  CREDIT_CARD: 'Cartao de credito',
  PIX: 'PIX',
  BOLETO: 'Boleto',
  CASH: 'Dinheiro'
};

const orderStatusLabels: Record<OrderStatus, string> = {
  CONFIRMED: 'Confirmado',
  PROCESSING: 'Processando',
  SHIPPED: 'Enviado',
  CANCELLED: 'Cancelado'
};

const roleLabels: Record<User['role'], string> = {
  ADMIN: 'Administrador',
  CUSTOMER: 'Cliente'
};

export function labelPetType(type?: PetType | null): string {
  if (!type) return '';
  return petTypeLabels[type] ?? type;
}

export function labelPaymentMethod(method?: PaymentMethod | null): string {
  if (!method) return '';
  return paymentMethodLabels[method] ?? method;
}

export function labelOrderStatus(status?: OrderStatus | null): string {
  if (!status) return '';
  return orderStatusLabels[status] ?? status;
}

export function labelUserRole(role?: User['role'] | null): string {
  if (!role) return '';
  return roleLabels[role] ?? role;
}
