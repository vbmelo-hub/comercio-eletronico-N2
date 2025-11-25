import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { AuthResponse, CartItem, OrderRecord, Product, User } from './models';

interface CartState {
  items: CartItem[];
  couponCode?: string;
}

@Injectable({ providedIn: 'root' })
export class StateService {
  user$ = new BehaviorSubject<User | null>(null);
  cart$ = new BehaviorSubject<CartState>({ items: [] });
  orders$ = new BehaviorSubject<OrderRecord[]>([]);
  token: string | null = null;

  constructor(private api: ApiService) {
    const storedToken = localStorage.getItem('petshop-token');
    const storedCart = localStorage.getItem('petshop-cart');
    if (storedToken) {
      this.setToken(storedToken);
      this.api.me().subscribe(user => this.user$.next(user));
    }
    if (storedCart) {
      this.cart$.next(JSON.parse(storedCart));
    }
  }

  private persistCart() {
    localStorage.setItem('petshop-cart', JSON.stringify(this.cart$.value));
  }

  setToken(token: string | null) {
    this.token = token;
    this.api.setToken(token);
    if (token) localStorage.setItem('petshop-token', token);
    else localStorage.removeItem('petshop-token');
  }

  setUserAuth(auth: AuthResponse) {
    this.setToken(auth.token);
    this.user$.next({
      id: auth.userId,
      name: auth.name,
      email: auth.email,
      role: auth.role,
      pets: []
    });
  }

  logout() {
    this.setToken(null);
    this.user$.next(null);
  }

  addToCart(product: Product, quantity = 1) {
    const cart = this.cart$.value;
    const existing = cart.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    } else {
      cart.items.push({ product, quantity });
    }
    this.cart$.next({ ...cart });
    this.persistCart();
  }

  updateQty(productId: number, quantity: number) {
    const cart = this.cart$.value;
    cart.items = cart.items
      .map(i => (i.product.id === productId ? { ...i, quantity } : i))
      .filter(i => i.quantity > 0);
    this.cart$.next({ ...cart });
    this.persistCart();
  }

  removeFromCart(productId: number) {
    const cart = this.cart$.value;
    cart.items = cart.items.filter(i => i.product.id !== productId);
    this.cart$.next({ ...cart });
    this.persistCart();
  }

  clearCart() {
    this.cart$.next({ items: [] });
    this.persistCart();
  }

  setCoupon(code: string | undefined) {
    const cart = this.cart$.value;
    cart.couponCode = code;
    this.cart$.next({ ...cart });
    this.persistCart();
  }
}
