import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './servico-api.service';
import { StateService } from './estado.service';
import { ItemCarrinho, Categoria, Pedido, Produto, Usuario, MetodoPagamento } from './modelos';
import { CatalogFiltersComponent } from './components/catalog/filtros-catalogo.component';
import { ProductCardComponent } from './components/catalog/cartao-produto.component';
import { CartItemsComponent } from './components/cart/itens-carrinho.component';
import { CheckoutSummaryComponent } from './components/cart/resumo-checkout.component';
import { OrderListComponent } from './components/orders/lista-pedidos.component';
import { LoginPanelComponent } from './components/auth/painel-login.component';
import { SignupPanelComponent } from './components/auth/painel-cadastro.component';
import { AdminProductFormComponent } from './components/admin/formulario-produto-admin.component';
import { AdminCategoryPanelComponent } from './components/admin/painel-categoria-admin.component';
import { AdminOrdersPanelComponent } from './components/admin/painel-pedidos-admin.component';
import { labelUserRole } from './rotulos';
import { ModalLoginComponent } from './components/auth/modal-login.component';
import { ModalSignupComponent } from './components/auth/modal-signup.component';

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
    ModalLoginComponent,
    ModalSignupComponent,
    AdminProductFormComponent,
    AdminCategoryPanelComponent,
    AdminOrdersPanelComponent
  ],
  templateUrl: './componente-aplicacao.component.html',
  styleUrls: ['./componente-aplicacao.component.css']
})
export class ComponenteAplicacaoComponent implements OnInit {
  activeTab: 'catalog' | 'cart' | 'orders' | 'profile' | 'admin' = 'catalog';
  categories: Categoria[] = [];
  products: Produto[] = [];
  petFilter = '';
  categoryFilter: number | null = null;
  searchTerm = '';

  cartItems: ItemCarrinho[] = [];
  user: Usuario | null = null;
  orders: Pedido[] = [];

  loginForm = { email: '', senha: '' };
  signupForm = { nome: '', email: '', senha: '' };
  checkoutForm: { nome: string; email: string; rua: string; cidade: string; estado: string; cep: string; metodoPagamento: MetodoPagamento; retirada: boolean } =
    { nome: '', email: '', rua: '', cidade: '', estado: '', cep: '', metodoPagamento: 'PIX', retirada: false };
  adminProduct: any = { id: null, nome: '', descricao: '', preco: 0, estoque: 0, avaliacao: 4.5, urlImagem: '', tipoPet: 'CAO', categoriaId: null };
  adminCategory: any = { nome: '', tipoPet: 'CAO' };
  contactForm = { nome: '', email: '', rua: '', cidade: '', estado: '', cep: '' };
  profileError = '';

  statusMessage = '';
  paymentDetails: { metodo: MetodoPagamento; chavePix?: string; boleto?: string; qrCodeUrl?: string; info: string } | null = null;
  paymentModal = false;
  loginModal = false;
  signupModal = false;
  toast: { message: string; type: 'info' | 'error' } | null = null;
  readonly pixKey = 'pix@artemispets.com';
  formError = '';
  roleLabel = labelUserRole;

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
        this.prefillContactForm(u);
      }
      if (!this.isAdmin && this.activeTab === 'admin') {
        this.activeTab = 'catalog';
      }
    });
    this.loadCategories();
    this.loadProducts();
    this.prefillContactForm(this.user);
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

  addToCart(produto: Produto) {
    this.state.addToCart(produto, 1);
    this.showToast(`${produto.nome} adicionado ao carrinho`, 'info');
  }

  updateQty(produtoId: number, quantidade: number) {
    this.state.updateQty(produtoId, quantidade);
  }

  removeItem(produtoId: number) {
    this.state.removeFromCart(produtoId);
  }

  clearCart() {
    this.state.clearCart();
  }

  get cartTotal(): number {
    return this.cartItems.reduce((sum, i) => sum + i.produto.preco * i.quantidade, 0);
  }

  get deliveryFee(): number {
    return this.checkoutForm.retirada ? 0 : 15;
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

  setNome(v: string) { this.checkoutForm.nome = v; }
  setEmail(v: string) { this.checkoutForm.email = v; }
  setRua(v: string) { this.checkoutForm.rua = v; }
  setCidade(v: string) { this.checkoutForm.cidade = v; }
  setEstado(v: string) { this.checkoutForm.estado = v; }
  setCep(v: string) { this.checkoutForm.cep = v; }
  setRetirada(v: boolean) {
    this.checkoutForm.retirada = v;
    // Ajusta método conforme contexto
    if (v) {
      if (this.checkoutForm.metodoPagamento === 'CARTAO_ENTREGA') {
        this.checkoutForm.metodoPagamento = 'CARTAO_RETIRADA';
      }
      const allowed: MetodoPagamento[] = ['PIX', 'DINHEIRO', 'CARTAO_RETIRADA'];
      if (!allowed.includes(this.checkoutForm.metodoPagamento)) {
        this.checkoutForm.metodoPagamento = 'PIX';
      }
    } else {
      if (this.checkoutForm.metodoPagamento === 'CARTAO_RETIRADA') {
        this.checkoutForm.metodoPagamento = 'CARTAO_ENTREGA';
      }
      const allowed: MetodoPagamento[] = ['PIX', 'DINHEIRO', 'CARTAO_ENTREGA'];
      if (!allowed.includes(this.checkoutForm.metodoPagamento)) {
        this.checkoutForm.metodoPagamento = 'PIX';
      }
    }
  }
  setMetodoPagamento(v: MetodoPagamento) { this.checkoutForm.metodoPagamento = v; }

  login() {
    this.api.login(this.loginForm.email, this.loginForm.senha).subscribe(res => {
      this.state.setUserAuth(res);
      this.refreshUser();
      this.loadOrders();
      this.showToast('Login realizado', 'info');
      this.activeTab = 'catalog';
    });
  }

  signup() {
    this.api.signup(this.signupForm.nome, this.signupForm.email, this.signupForm.senha).subscribe(res => {
      this.state.setUserAuth(res);
      this.refreshUser();
      this.showToast('Conta criada', 'info');
    });
  }

  prefillContactForm(user: Usuario | null) {
    const stored = localStorage.getItem('petshop-profile-contact');
    let saved: any = null;
    try {
      saved = stored ? JSON.parse(stored) : null;
    } catch {
      saved = null;
    }
    this.contactForm = {
      nome: saved?.nome ?? user?.nome ?? this.checkoutForm.nome ?? '',
      email: saved?.email ?? user?.email ?? this.checkoutForm.email ?? '',
      rua: saved?.rua ?? this.checkoutForm.rua ?? '',
      cidade: saved?.cidade ?? this.checkoutForm.cidade ?? '',
      estado: saved?.estado ?? this.checkoutForm.estado ?? '',
      cep: saved?.cep ?? this.checkoutForm.cep ?? ''
    };
    this.checkoutForm = {
      ...this.checkoutForm,
      nome: this.contactForm.nome || this.checkoutForm.nome,
      email: this.contactForm.email || this.checkoutForm.email,
      rua: this.contactForm.rua || this.checkoutForm.rua,
      cidade: this.contactForm.cidade || this.checkoutForm.cidade,
      estado: this.contactForm.estado || this.checkoutForm.estado,
      cep: this.contactForm.cep || this.checkoutForm.cep
    };
  }

  saveProfileContact() {
    if (!this.user) {
      this.profileError = 'Entre na sua conta para editar o perfil.';
      return;
    }
    this.profileError = '';
    const nome = (this.contactForm.nome || '').trim();
    const email = (this.contactForm.email || '').trim();
    if (!nome) {
      this.profileError = 'Informe um nome.';
      return;
    }
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!emailOk) {
      this.profileError = 'Email invalido.';
      return;
    }
    const updatedUser: Usuario = { ...this.user, nome, email };
    this.user = updatedUser;
    this.state.user$.next(updatedUser);
    this.checkoutForm = {
      ...this.checkoutForm,
      nome,
      email,
      rua: this.contactForm.rua,
      cidade: this.contactForm.cidade,
      estado: this.contactForm.estado,
      cep: this.contactForm.cep
    };
    localStorage.setItem('petshop-profile-contact', JSON.stringify(this.contactForm));
    this.showToast('Dados do perfil atualizados', 'info');
  }

  logout() {
    this.state.logout();
    this.orders = [];
    this.activeTab = 'catalog';
    this.paymentModal = false;
    this.paymentDetails = null;
    this.showToast('Sessao encerrada', 'info');
  }

  get isAdmin(): boolean {
    return this.user?.papel === 'ADMIN';
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
    if (!this.checkoutForm.nome.trim()) {
      this.formError = 'Preencha o nome.';
      return;
    }
    const email = this.checkoutForm.email.trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!emailOk) {
      this.formError = 'Informe um email valido.';
      return;
    }
    if (!this.checkoutForm.retirada) {
      if (!this.checkoutForm.rua.trim() || !this.checkoutForm.cidade.trim() || !this.checkoutForm.estado.trim() || !this.checkoutForm.cep.trim()) {
        this.formError = 'Preencha endereco completo para entrega ou escolha retirar na loja.';
        return;
      }
    }
    const itens = this.cartItems.map(i => ({ produtoId: i.produto.id, quantidade: i.quantidade }));
    const payload = {
      itens,
      codigoCupom: undefined,
      metodoPagamento: this.checkoutForm.metodoPagamento,
      nome: this.checkoutForm.nome,
      email: this.checkoutForm.email,
      rua: this.checkoutForm.rua,
      cidade: this.checkoutForm.cidade,
      estado: this.checkoutForm.estado,
      cep: this.checkoutForm.cep,
      retirada: this.checkoutForm.retirada
    };
    this.api.createOrder(payload).subscribe({
      next: order => {
        this.showToast(`Pedido ${order.id} confirmado`, 'info');
        this.state.clearCart();
        const tempoLimite = this.checkoutForm.retirada
          ? (this.checkoutForm.metodoPagamento === 'PIX' ? '' : 'Retire em até 2h na loja.')
          : (this.checkoutForm.metodoPagamento === 'PIX' ? '' : 'Entrega estimada em até 1h30 com pagamento no local.');
        if (this.checkoutForm.metodoPagamento === 'PIX') {
          this.paymentDetails = {
            metodo: 'PIX',
            chavePix: this.pixKey,
            qrCodeUrl: this.buildPixQr(this.pixKey),
            info: 'Use a chave PIX ou o QR Code para pagar.'
          };
        } else {
          this.paymentDetails = { metodo: this.checkoutForm.metodoPagamento, info: tempoLimite || 'Pagamento no local.' };
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

  closePaymentModal() {
    this.paymentModal = false;
    this.paymentDetails = null;
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
    if (order.metodoPagamento === 'PIX') {
      const pixPayload = order.codigoPagamento || this.pixKey;
      this.paymentDetails = { metodo: 'PIX', chavePix: pixPayload, qrCodeUrl: this.buildPixQr(pixPayload), info: 'Use a chave PIX ou o QR Code para pagar.' };
    } else if (order.metodoPagamento === 'BOLETO') {
      this.paymentDetails = { metodo: 'BOLETO', boleto: order.codigoPagamento, info: 'Boleto gerado. Pague em ate 48h.' };
    } else {
      this.paymentDetails = { metodo: 'DINHEIRO', info: 'Pague em dinheiro na entrega/retirada.' };
    }
    this.paymentModal = true;
  }

  saveProduct() {
    this.api.adminSaveProduct(this.adminProduct).subscribe(() => {
      this.showToast('Produto salvo', 'info');
      this.adminProduct = { id: null, nome: '', descricao: '', preco: 0, estoque: 0, avaliacao: 4.5, urlImagem: '', tipoPet: 'CAO', categoriaId: null };
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
      this.adminCategory = { nome: '', tipoPet: 'CAO' };
      this.loadCategories();
    });
  }

  deleteCategory(id: number) {
    this.api.adminDeleteCategory(id).subscribe(() => {
      this.showToast('Categoria removida', 'info');
      this.loadCategories();
    });
  }

  showToast(message: string, type: 'info' | 'error' = 'info') {
    this.toast = { message, type };
    setTimeout(() => (this.toast = null), 2500);
  }

  openLoginModal() {
    this.loginModal = true;
    this.signupModal = false;
  }

  openSignupModal() {
    this.signupModal = true;
    this.loginModal = false;
  }

  closeAuthModals() {
    this.loginModal = false;
    this.signupModal = false;
  }
}
