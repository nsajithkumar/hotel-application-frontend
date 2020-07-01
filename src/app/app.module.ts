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
import { UpdateAdminComponent } from './pages/update-admin/update-admin.component';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';

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
    UpdateAdminComponent,
    UpdateCustomerComponent,
    UpdateProductComponent
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
