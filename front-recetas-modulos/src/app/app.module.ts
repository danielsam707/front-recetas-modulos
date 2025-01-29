import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';
import { RecetaComponent } from './receta/receta.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PruebaComponent } from './prueba/prueba.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpInterceptor} from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    RecetaComponent,
    DetalleRecetaComponent,
    LoginComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,  // Usamos la función interceptor
      multi: true  // Permite que haya múltiples interceptores
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
