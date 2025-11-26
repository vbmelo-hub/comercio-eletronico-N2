export type PetType = 'DOG' | 'CAT' | 'ACCESSORY';
export type PaymentMethod = 'CREDIT_CARD' | 'PIX' | 'BOLETO' | 'CASH';
export type OrderStatus = 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';

export interface Category {
  id: number;
  name: string;
  petType: PetType;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  imageUrl: string;
  petType: PetType;
  category: Category;
}

export interface Coupon {
  id: number;
  code: string;
  discountPercent: number;
  active: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  pets: PetProfile[];
}

export interface PetProfile {
  name: string;
  age?: string;
  breed?: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
  couponCode?: string;
  paymentMethod: PaymentMethod;
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderRecord {
  id: number;
  user: User;
  items: OrderItem[];
  address: {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  couponCode?: string;
  subtotal: number;
  discount: number;
  total: number;
  paymentCode?: string;
  pickup?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
