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
import { RegisterComponent } from './pages/authentication/register/register.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { ForgetPasswordComponent } from './pages/authentication/forget-password/forget-password.component';
import { AddAdminsComponent } from './pages/admins/add-admins/add-admins.component';
import { AddedAdminsComponent } from './pages/admins/added-admins/added-admins.component';
import { AddedCustomersComponent } from './pages/customers/added-customers/added-customers.component';
import { AddCustomersComponent } from './pages/customers/add-customers/add-customers.component';
import { AddProductsComponent } from './pages/products/add-products/add-products.component';
import { AddedProductsComponent } from './pages/products/added-products/added-products.component';

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
    MyordersComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    AddAdminsComponent,
    AddedAdminsComponent,
    AddedCustomersComponent,
    AddCustomersComponent,
    AddProductsComponent,
    AddedProductsComponent
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
