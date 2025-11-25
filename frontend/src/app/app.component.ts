import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { CartItem, Category, OrderRecord, Product, User, PaymentMethod } from './models';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeTab: 'catalog' | 'cart' | 'orders' | 'profile' | 'admin' = 'catalog';
  categories: Category[] = [];
  products: Product[] = [];
  petFilter = '';
  categoryFilter: number | null = null;
  searchTerm = '';

  cartItems: CartItem[] = [];
  user: User | null = null;
  orders: OrderRecord[] = [];

  loginForm = { email: '', password: '' };
  signupForm = { name: '', email: '', password: '' };
  checkoutForm: { name: string; email: string; street: string; city: string; state: string; zip: string; paymentMethod: PaymentMethod; coupon: string } =
    { name: '', email: '', street: '', city: '', state: '', zip: '', paymentMethod: 'CREDIT_CARD', coupon: '' };
  petForm = { name: '', age: '', breed: '' };

  adminProduct: any = { id: null, name: '', description: '', price: 0, stock: 0, rating: 4.5, imageUrl: '', petType: 'DOG', categoryId: null };
  adminCategory: any = { name: '', petType: 'DOG' };
  couponForm: any = { code: '', discountPercent: 10, active: true };
  coupons: any[] = [];

  statusMessage = '';

  constructor(private api: ApiService, private state: StateService) {}

  ngOnInit(): void {
    this.state.cart$.subscribe(c => (this.cartItems = c.items));
    this.state.user$.subscribe(u => {
      this.user = u;
      if (u) {
        this.loadOrders();
        this.api.setToken(this.state.token);
      }
      if (!this.isAdmin && this.activeTab === 'admin') {
        this.activeTab = 'catalog';
      }
    });
    this.loadCategories();
    this.loadProducts();
    this.refreshUser();
  }

  setTab(tab: typeof this.activeTab) {
    if (tab === 'admin' && !this.isAdmin) {
      this.activeTab = 'catalog';
      return;
    }
    this.activeTab = tab;
  }

  refreshUser() {
    this.api.me().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.state.user$.next(user);
          this.api.setToken(this.state.token);
          if (this.isAdmin) {
            this.loadCoupons();
          }
        }
      },
      error: () => {
        // ignora erro 401/500 ao inicializar sem token
      }
    });
  }

  loadCategories() {
    this.api.getCategories().subscribe(data => (this.categories = data));
  }

  loadProducts() {
    this.api.getProducts(this.categoryFilter ?? undefined, this.petFilter || undefined, this.searchTerm || undefined).subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product) {
    this.state.addToCart(product, 1);
    this.statusMessage = `${product.name} adicionado ao carrinho`;
  }

  updateQty(productId: number, qty: number) {
    this.state.updateQty(productId, qty);
  }

  removeItem(productId: number) {
    this.state.removeFromCart(productId);
  }

  clearCart() {
    this.state.clearCart();
  }

  applyCoupon() {
    this.state.setCoupon(this.checkoutForm.coupon || undefined);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  login() {
    this.api.login(this.loginForm.email, this.loginForm.password).subscribe(res => {
      this.state.setUserAuth(res);
      this.refreshUser();
      this.loadOrders();
      this.statusMessage = 'Login realizado';
      this.activeTab = 'catalog';
    });
  }

  signup() {
    this.api.signup(this.signupForm.name, this.signupForm.email, this.signupForm.password).subscribe(res => {
      this.state.setUserAuth(res);
      this.refreshUser();
      this.statusMessage = 'Conta criada';
    });
  }

  logout() {
    this.state.logout();
    this.orders = [];
    this.activeTab = 'catalog';
  }

  get isAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }

  loadOrders() {
    this.api.listOrders().subscribe(data => (this.orders = data));
  }

  checkout() {
    if (!this.user) {
      this.statusMessage = 'Entre para finalizar';
      this.activeTab = 'profile';
      return;
    }
    const items = this.cartItems.map(i => ({ productId: i.product.id, quantity: i.quantity }));
    const payload = {
      items,
      couponCode: this.checkoutForm.coupon || undefined,
      paymentMethod: this.checkoutForm.paymentMethod,
      name: this.checkoutForm.name,
      email: this.checkoutForm.email,
      street: this.checkoutForm.street,
      city: this.checkoutForm.city,
      state: this.checkoutForm.state,
      zip: this.checkoutForm.zip
    };
    this.api.createOrder(payload).subscribe(order => {
      this.statusMessage = `Pedido ${order.id} confirmado`;
      this.state.clearCart();
      this.loadOrders();
      this.loadProducts();
      this.activeTab = 'orders';
    });
  }

  addPet() {
    if (!this.user) return;
    this.api.addPet(this.petForm.name, this.petForm.age, this.petForm.breed).subscribe(() => {
      this.statusMessage = 'Pet adicionado';
      this.petForm = { name: '', age: '', breed: '' };
      this.refreshUser();
    });
  }

  // Admin
  loadCoupons() {
    this.api.adminListCoupons().subscribe(c => (this.coupons = c));
  }

  saveProduct() {
    this.api.adminSaveProduct(this.adminProduct).subscribe(() => {
      this.statusMessage = 'Produto salvo';
      this.adminProduct = { id: null, name: '', description: '', price: 0, stock: 0, rating: 4.5, imageUrl: '', petType: 'DOG', categoryId: null };
      this.loadProducts();
    });
  }

  deleteProduct(id: number) {
    this.api.adminDeleteProduct(id).subscribe(() => {
      this.statusMessage = 'Produto removido';
      this.loadProducts();
    });
  }

  saveCategory() {
    this.api.adminCreateCategory(this.adminCategory).subscribe(() => {
      this.statusMessage = 'Categoria salva';
      this.adminCategory = { name: '', petType: 'DOG' };
      this.loadCategories();
    });
  }

  deleteCategory(id: number) {
    this.api.adminDeleteCategory(id).subscribe(() => {
      this.statusMessage = 'Categoria removida';
      this.loadCategories();
    });
  }

  saveCoupon() {
    this.api.adminSaveCoupon(this.couponForm).subscribe(() => {
      this.statusMessage = 'Cupom salvo';
      this.couponForm = { code: '', discountPercent: 10, active: true };
      this.loadCoupons();
    });
  }
}
