import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthResponse,
  Category,
  Coupon,
  OrderRecord,
  OrderRequest,
  Product,
  User
} from './models';

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

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, { email, password });
  }

  signup(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/signup`, { name, email, password });
  }

  me(): Observable<User | null> {
    return this.http.get<User | null>(`${API_URL}/auth/me`, { headers: this.authHeaders() });
  }

  addPet(name: string, age?: string, breed?: string) {
    return this.http.post(`${API_URL}/auth/pets`, { name, age, breed }, { headers: this.authHeaders() });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/catalog/categories`);
  }

  getProducts(categoryId?: number, petType?: string, q?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId);
    if (petType) params = params.set('petType', petType);
    if (q) params = params.set('q', q);
    return this.http.get<Product[]>(`${API_URL}/catalog/products`, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/catalog/products/${id}`);
  }

  createOrder(request: OrderRequest): Observable<OrderRecord> {
    return this.http.post<OrderRecord>(`${API_URL}/orders`, request, { headers: this.authHeaders() });
  }

  listOrders(): Observable<OrderRecord[]> {
    return this.http.get<OrderRecord[]>(`${API_URL}/orders`, { headers: this.authHeaders() });
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
    return this.http.post<Coupon>(`${API_URL}/admin/coupons`, payload, { headers: this.authHeaders() });
  }

  adminListCoupons() {
    return this.http.get<Coupon[]>(`${API_URL}/admin/coupons`, { headers: this.authHeaders() });
  }

  adminListOrders() {
    return this.http.get<OrderRecord[]>(`${API_URL}/admin/orders`, { headers: this.authHeaders() });
  }
}
