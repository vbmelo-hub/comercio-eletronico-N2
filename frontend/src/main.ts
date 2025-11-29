import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { ComponenteAplicacaoComponent } from './app/componente-aplicacao.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(ComponenteAplicacaoComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));
