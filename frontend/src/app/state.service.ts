import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { RespostaAuth, ItemCarrinho, Pedido, Produto, Usuario } from './models';

interface CartState {
  items: ItemCarrinho[];
  codigoCupom?: string;
}

@Injectable({ providedIn: 'root' })
export class StateService {
  user$ = new BehaviorSubject<Usuario | null>(null);
  cart$ = new BehaviorSubject<CartState>({ items: [] });
  orders$ = new BehaviorSubject<Pedido[]>([]);
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

  setUserAuth(auth: RespostaAuth) {
    this.setToken(auth.token);
    this.user$.next({
      id: auth.usuarioId,
      nome: auth.nome,
      email: auth.email,
      papel: auth.papel,
      pets: []
    });
  }

  logout() {
    this.setToken(null);
    this.user$.next(null);
  }

  addToCart(produto: Produto, quantidade = 1) {
    const cart = this.cart$.value;
    const existing = cart.items.find(i => i.produto.id === produto.id);
    if (existing) {
      existing.quantidade = Math.min(existing.quantidade + quantidade, produto.estoque);
    } else {
      cart.items.push({ produto, quantidade });
    }
    this.cart$.next({ ...cart });
    this.persistCart();
  }

  updateQty(produtoId: number, quantidade: number) {
    const cart = this.cart$.value;
    cart.items = cart.items
      .map(i => (i.produto.id === produtoId ? { ...i, quantidade } : i))
      .filter(i => i.quantidade > 0);
    this.cart$.next({ ...cart });
    this.persistCart();
  }

  removeFromCart(produtoId: number) {
    const cart = this.cart$.value;
    cart.items = cart.items.filter(i => i.produto.id !== produtoId);
    this.cart$.next({ ...cart });
    this.persistCart();
  }

  clearCart() {
    this.cart$.next({ items: [] });
    this.persistCart();
  }

  setCoupon(codigo: string | undefined) {
    const cart = this.cart$.value;
    cart.codigoCupom = codigo;
    this.cart$.next({ ...cart });
    this.persistCart();
  }
}
