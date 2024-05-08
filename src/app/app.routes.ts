import { Routes } from "@angular/router";
import { LoginPageComponent } from "./routers/auth/login-page/login-page.component";
import { MainLayoutComponent } from "./shared/layouts/main-layout/main-layout.component";
import { SearchCustomerPageComponent } from "./routers/customers/search-customer-page/search-customer-page.component";
import { CustomerDetailsPageComponent } from "./routers/customers/customer-details-page/customer-details-page.component";
import { CustomerInfoComponent } from "./features/customer-details/components/customer-info/customer-info.component";
import { CustomerInfoUpdateFormComponent } from "./features/customer-details/components/customer-info-update-form/customer-info-update-form.component";
import { CustomerAccountComponent } from "./features/customer-details/components/customer-account/customer-account.component";
import { CustomerInfoAddressFormComponent } from "./features/customer-details/components/customer-info-address-form/customer-info-address-form.component";
import { ContactMediumInfoComponent } from "./features/customer-details/components/contact-medium-info/contact-medium-info.component";
import { ContactMediumInfoUpdateFormComponent } from "./features/customer-details/components/contact-medium-info-update-form/contact-medium-info-update-form.component";
import { CreateCustomerLayoutComponent } from "./shared/layouts/create-customer-layout/create-customer-layout.component";
import { DemographicFormComponent } from "./features/customers/components/demographic-form/demographic-form.component";
import { AddressInfoComponent } from "./features/customers/components/address-info/address-info.component";
import { ContactMediumComponent } from "./features/customers/components/contact-medium/contact-medium.component";
import { OfferSelectionPageComponent } from "./routers/offers/offer-selection-page/offer-selection-page.component";
import { OfferConfigurationProductPageComponent } from "./routers/offers/offer-selection-page/offer-configuration-product-page/offer-configuration-product-page.component";
import { OffersLayoutComponent } from "./shared/layouts/offers-layout/offers-layout.component";
import { SubmitOrderPageComponent } from "./routers/offers/submit-order-page/submit-order-page.component";


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
          {
            path: "customer-info/:id",
            component: CustomerInfoComponent,
          },
          {
            path: "customer-info-update/:id",
            component: CustomerInfoUpdateFormComponent,
          },
          {
            path:"customer-account",
            component: CustomerAccountComponent
          },
          {
            path: "customer-address",
            component: CustomerInfoAddressFormComponent,
          },
          {
            path:"contact-medium-info/:id",
            component: ContactMediumInfoComponent
          },
          {
            path:"contact-medium-info-update",
            component: ContactMediumInfoUpdateFormComponent
          }
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
    {
      path:"offers",
      component: OffersLayoutComponent,
      children:[
        {
          path: "",
          pathMatch: "full",
          component: OfferSelectionPageComponent
        },
        {
          path: "configuration-product",
          component: OfferConfigurationProductPageComponent
        },
        {
          path:"submit-order",
          component: SubmitOrderPageComponent
        }

      ]
    },
];
