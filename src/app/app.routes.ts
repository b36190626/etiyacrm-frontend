import { Routes } from '@angular/router';
import { LoginPageComponent } from './routers/auth/login-page/login-page.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';
import { SearchCustomerPageComponent } from './routers/customers/search-customer-page/search-customer-page.component';
import { ContactMediumComponent } from './features/customers/components/contact-medium/contact-medium.component';
import { AddressInfoComponent } from './features/customers/components/address-info/address-info.component';
import { CreateCustomerLayoutComponent } from '../shared/layouts/create-customer-layout/create-customer-layout.component';
import { DemographicFormComponent } from './features/customers/components/demographic-form/demographic-form.component';
import { CustomerDetailsPageComponent } from './routers/customers/customer-details-page/customer-details-page.component';
import { CustomerInfoComponent } from './features/customer-details/components/customer-info/customer-info.component';

export const routes: Routes = [
  {
    path: "auth/login",
    component: LoginPageComponent,
  },
  {
    path:"home",
    component: MainLayoutComponent,
    children:[
      {
        path:"search",
        component:SearchCustomerPageComponent,
      },
      {
        path:"customer",
        component:CustomerDetailsPageComponent,
        children:[
          {
            path:"",
            pathMatch: 'full',
            component: CustomerInfoComponent,
          },
        ]
      },
    ]
  },
  {
    path: "create-customer",
    component: CreateCustomerLayoutComponent,
    children:[
      {
        path: "",
        pathMatch: "full",
        component: DemographicFormComponent
      },
      {
        path: "address-info",
        component: AddressInfoComponent
      },
      {
        path: "contact-medium",
        component: ContactMediumComponent,
      },
    ]
},
];
