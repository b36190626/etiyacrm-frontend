import { Routes } from '@angular/router';
import { LoginPageComponent } from './routers/auth/login-page/login-page.component';

export const routes: Routes = [
  {
    path: "auth/login",
    component: LoginPageComponent,
  },
];
