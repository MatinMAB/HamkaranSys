import { Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { AllusersComponent } from './allusers/allusers.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { LoginComponent } from './login/login.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'add-user', component: AdduserComponent, canActivate: [RoleGuard] },
  { path: 'all-users', component: AllusersComponent },
  { path: 'edit-user/:id', component: EdituserComponent },
  { path: 'add-product', component: AddproductComponent },
  { path: 'all-products', component: AllproductsComponent },
  { path: 'edit-product/:id', component: EditproductComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
];
