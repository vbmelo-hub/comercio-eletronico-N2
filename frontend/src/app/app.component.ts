import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { StateService } from './state.service';
import { CartItem, Category, OrderRecord, Product, User, PaymentMethod } from './models';
import { CatalogFiltersComponent } from './components/catalog/catalog-filters.component';
import { ProductCardComponent } from './components/catalog/product-card.component';
import { CartItemsComponent } from './components/cart/cart-items.component';
import { CheckoutSummaryComponent } from './components/cart/checkout-summary.component';
import { OrderListComponent } from './components/orders/order-list.component';
import { LoginPanelComponent } from './components/auth/login-panel.component';
import { SignupPanelComponent } from './components/auth/signup-panel.component';
import { PetListComponent } from './components/pets/pet-list.component';
import { AdminProductFormComponent } from './components/admin/admin-product-form.component';
import { AdminCategoryPanelComponent } from './components/admin/admin-category-panel.component';
import { AdminCouponPanelComponent } from './components/admin/admin-coupon-panel.component';
import { AdminOrdersPanelComponent } from './components/admin/admin-orders-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CatalogFiltersComponent,
    ProductCardComponent,
    CartItemsComponent,
    CheckoutSummaryComponent,
    OrderListComponent,
    LoginPanelComponent,
    SignupPanelComponent,
    PetListComponent,
    AdminProductFormComponent,
    AdminCategoryPanelComponent,
    AdminCouponPanelComponent,
    AdminOrdersPanelComponent
  ],
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
  checkoutForm: { name: string; email: string; street: string; city: string; state: string; zip: string; paymentMethod: PaymentMethod; coupon: string; pickup: boolean } =
    { name: '', email: '', street: '', city: '', state: '', zip: '', paymentMethod: 'PIX', coupon: '', pickup: false };
  petForm = { name: '', age: '', breed: '' };

  adminProduct: any = { id: null, name: '', description: '', price: 0, stock: 0, rating: 4.5, imageUrl: '', petType: 'DOG', categoryId: null };
  adminCategory: any = { name: '', petType: 'DOG' };
  couponForm: any = { code: '', discountPercent: 10, active: true };
  coupons: any[] = [];

  statusMessage = '';
  paymentDetails: { method: PaymentMethod; pixKey?: string; boleto?: string; qrCodeUrl?: string; info: string } | null = null;
  paymentModal = false;
  toast: { message: string; type: 'info' | 'error' } | null = null;
  readonly pixKey = 'pix@artemispets.com';
  formError = '';

  private buildPixQr(payload: string): string {
    return `https://quickchart.io/qr?text=${encodeURIComponent(payload)}`;
  }

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
      error: () => {}
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
    this.showToast(`${product.name} adicionado ao carrinho`, 'info');
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

  get deliveryFee(): number {
    return this.checkoutForm.pickup ? 0 : 15;
  }

  get totalWithDelivery(): number {
    return this.cartTotal + this.deliveryFee;
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.loadProducts();
  }

  onPetChange(pet: string) {
    this.petFilter = pet;
    this.loadProducts();
  }

  onCategoryChange(catId: number | null) {
    this.categoryFilter = catId;
    this.loadProducts();
  }

  setName(v: string) { this.checkoutForm.name = v; }
  setEmail(v: string) { this.checkoutForm.email = v; }
  setStreet(v: string) { this.checkoutForm.street = v; }
  setCity(v: string) { this.checkoutForm.city = v; }
  setState(v: string) { this.checkoutForm.state = v; }
  setZip(v: string) { this.checkoutForm.zip = v; }
  setPickup(v: boolean) { this.checkoutForm.pickup = v; }
  setPaymentMethod(v: PaymentMethod) { this.checkoutForm.paymentMethod = v; }

  login() {
    this.api.login(this.loginForm.email, this.loginForm.password).subscribe(res => {
      this.state.setUserAuth(res);
      this.refreshUser();
      this.loadOrders();
      this.showToast('Login realizado', 'info');
      this.activeTab = 'catalog';
    });
  }

  signup() {
    this.api.signup(this.signupForm.name, this.signupForm.email, this.signupForm.password).subscribe(res => {
      this.state.setUserAuth(res);
      this.refreshUser();
      this.showToast('Conta criada', 'info');
    });
  }

  logout() {
    this.state.logout();
    this.orders = [];
    this.activeTab = 'catalog';
    this.showToast('Sessão encerrada', 'info');
  }

  get isAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }

  loadOrders() {
    if (!this.user) {
      this.orders = [];
      return;
    }
    this.api.listOrders().subscribe(data => (this.orders = data));
  }

  checkout() {
    this.formError = '';
    if (!this.checkoutForm.name.trim()) {
      this.formError = 'Preencha o nome.';
      return;
    }
    const email = this.checkoutForm.email.trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!emailOk) {
      this.formError = 'Informe um email valido.';
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
      zip: this.checkoutForm.zip,
      pickup: this.checkoutForm.pickup
    };
    this.api.createOrder(payload).subscribe({
      next: order => {
        this.showToast(`Pedido ${order.id} confirmado`, 'info');
        this.state.clearCart();
        if (this.checkoutForm.paymentMethod === 'PIX') {
          this.paymentDetails = {
            method: 'PIX',
            pixKey: this.pixKey,
            qrCodeUrl: this.buildPixQr(this.pixKey),
            info: 'Use a chave PIX ou o QR Code para pagar.'
          };
        } else {
          const boleto = `34191.${Date.now().toString().slice(-10)}`;
          this.paymentDetails = { method: 'BOLETO', boleto, info: 'Boleto gerado. Pague em ate 48h.' };
        }
        this.paymentModal = true;
        if (this.user) {
          this.loadOrders();
        } else {
          this.showToast('Crie uma conta para salvar o histórico.', 'info');
          this.orders = [];
        }
        this.loadProducts();
        this.activeTab = 'orders';
      },
      error: (err) => {
        this.formError = err?.error?.error || 'Nao foi possivel finalizar. Verifique os dados.';
        this.showToast(this.formError, 'error');
      }
    });
  }

  copyPix(key: string) {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(key).then(() => {
        this.showToast('Chave PIX copiada', 'info');
      });
    } else {
      this.showToast('Copie manualmente: ' + key, 'info');
    }
  }

  openPaymentModalFromOrder(order: any) {
    if (!order) return;
    if (order.paymentMethod === 'PIX') {
      const pixPayload = order.paymentCode || this.pixKey;
      this.paymentDetails = { method: 'PIX', pixKey: pixPayload, qrCodeUrl: this.buildPixQr(pixPayload), info: 'Use a chave PIX ou o QR Code para pagar.' };
    } else {
      this.paymentDetails = { method: 'BOLETO', boleto: order.paymentCode, info: 'Boleto gerado. Pague em ate 48h.' };
    }
    this.paymentModal = true;
  }

  addPet() {
    if (!this.user) return;
    this.api.addPet(this.petForm.name, this.petForm.age, this.petForm.breed).subscribe(() => {
      this.showToast('Pet adicionado', 'info');
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
      this.showToast('Produto salvo', 'info');
      this.adminProduct = { id: null, name: '', description: '', price: 0, stock: 0, rating: 4.5, imageUrl: '', petType: 'DOG', categoryId: null };
      this.loadProducts();
    });
  }

  deleteProduct(id: number) {
    this.api.adminDeleteProduct(id).subscribe(() => {
      this.showToast('Produto removido', 'info');
      this.loadProducts();
    });
  }

  saveCategory() {
    this.api.adminCreateCategory(this.adminCategory).subscribe(() => {
      this.showToast('Categoria salva', 'info');
      this.adminCategory = { name: '', petType: 'DOG' };
      this.loadCategories();
    });
  }

  deleteCategory(id: number) {
    this.api.adminDeleteCategory(id).subscribe(() => {
      this.showToast('Categoria removida', 'info');
      this.loadCategories();
    });
  }

  saveCoupon() {
    this.api.adminSaveCoupon(this.couponForm).subscribe(() => {
      this.showToast('Cupom salvo', 'info');
      this.couponForm = { code: '', discountPercent: 10, active: true };
      this.loadCoupons();
    });
  }

  showToast(message: string, type: 'info' | 'error' = 'info') {
    this.toast = { message, type };
    setTimeout(() => (this.toast = null), 2500);
  }
}
