import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { LogsComponent } from './pages/logs/logs.component';
import { ProductsComponent } from './pages/products/products.component';
import { MyordersComponent } from './pages/myorders/myorders.component';

const routes: Routes = [
  {
    path:'authentication',
    component:AuthenticationComponent
  },
  {
    path:'reset-password/:id',
    component:ResetPasswordComponent
  },
  {
    path:'admins',
    component:AdminsComponent
  },
  {
    path:'customers',
    component:CustomersComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'logs',
    component:LogsComponent
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'my-orders',
    component:MyordersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
