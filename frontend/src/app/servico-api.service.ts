import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RespostaAuth,
  Categoria,
  Cupom,
  Pedido,
  PedidoRequisicao,
  Produto,
  Usuario
} from './modelos';

const API_URL = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  setToken(token: string | null) {
    this.token = token;
  }

  private authHeaders(): HttpHeaders {
    return this.token ? new HttpHeaders({ 'X-Auth-Token': this.token }) : new HttpHeaders();
  }

  login(email: string, senha: string): Observable<RespostaAuth> {
    return this.http.post<RespostaAuth>(`${API_URL}/auth/login`, { email, senha });
  }

  signup(nome: string, email: string, senha: string): Observable<RespostaAuth> {
    return this.http.post<RespostaAuth>(`${API_URL}/auth/signup`, { nome, email, senha });
  }

  me(): Observable<Usuario | null> {
    return this.http.get<Usuario | null>(`${API_URL}/auth/me`, { headers: this.authHeaders() });
  }

  addPet(nome: string, idade?: string, raca?: string) {
    return this.http.post(`${API_URL}/auth/pets`, { nome, idade, raca }, { headers: this.authHeaders() });
  }

  getCategories(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${API_URL}/catalog/categories`);
  }

  getProducts(categoryId?: number, petType?: string, q?: string): Observable<Produto[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId);
    if (petType) params = params.set('petType', petType);
    if (q) params = params.set('q', q);
    return this.http.get<Produto[]>(`${API_URL}/catalog/products`, { params });
  }

  getProduct(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${API_URL}/catalog/products/${id}`);
  }

  createOrder(request: PedidoRequisicao): Observable<Pedido> {
    return this.http.post<Pedido>(`${API_URL}/orders`, request, { headers: this.authHeaders() });
  }

  listOrders(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${API_URL}/orders`, { headers: this.authHeaders() });
  }

  // Admin endpoints
  adminSaveProduct(payload: any) {
    return payload.id
      ? this.http.put(`${API_URL}/admin/products/${payload.id}`, payload, { headers: this.authHeaders() })
      : this.http.post(`${API_URL}/admin/products`, payload, { headers: this.authHeaders() });
  }

  adminDeleteProduct(id: number) {
    return this.http.delete(`${API_URL}/admin/products/${id}`, { headers: this.authHeaders() });
  }

  adminCreateCategory(payload: any) {
    return this.http.post(`${API_URL}/admin/categories`, payload, { headers: this.authHeaders() });
  }

  adminDeleteCategory(id: number) {
    return this.http.delete(`${API_URL}/admin/categories/${id}`, { headers: this.authHeaders() });
  }

  adminSaveCoupon(payload: any) {
    return this.http.post<Cupom>(`${API_URL}/admin/coupons`, payload, { headers: this.authHeaders() });
  }

  adminListCoupons() {
    return this.http.get<Cupom[]>(`${API_URL}/admin/coupons`, { headers: this.authHeaders() });
  }

  adminListOrders() {
    return this.http.get<Pedido[]>(`${API_URL}/admin/orders`, { headers: this.authHeaders() });
  }
}
