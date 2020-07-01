import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { LogsComponent } from './pages/logs/logs.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/home/orders/orders.component';
import { ProductsViewComponent } from './pages/home/products-view/products-view.component';
import { HeaderComponent } from './pages/header/header.component';
import { MyordersComponent } from './pages/myorders/myorders.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ResetPasswordComponent,
    AdminsComponent,
    CustomersComponent,
    LogsComponent,
    HomeComponent,
    ProductsComponent,
    OrdersComponent,
    ProductsViewComponent,
    HeaderComponent,
    MyordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
