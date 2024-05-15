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
import { confirmationRouteGuard } from "./shared/guards/confirmation-route.guard";
import { CreateBillingAccountComponent } from "./features/customer-details/components/create-billing-account/create-billing-account.component";
import { UpdateBillingAccountComponent } from "./features/customer-details/components/update-billing-account/update-billing-account.component";


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: "auth/login",
    component: LoginPageComponent,
  },
  {
    path:"home",
    component: MainLayoutComponent,
    children:[
      {
        path:"",
        pathMatch: 'full',
        component:SearchCustomerPageComponent,
      },
      {
        path:"customer/:id",
        component:CustomerDetailsPageComponent,
        children:[
          {
            path:"",
            pathMatch: 'full',
            component: CustomerInfoComponent,
          },
          {
            path: "info",
            component: CustomerInfoComponent,
          },
          {
            path: "info-update",
            component: CustomerInfoUpdateFormComponent,
            canDeactivate: [confirmationRouteGuard],
          },
          {
            path:"account",
            component: CustomerAccountComponent,
            children: [
              {
                path:"create-account",
                pathMatch: 'prefix',
                component:CreateBillingAccountComponent
              },

            ]
          },
          {
            path: "address",
            component: CustomerInfoAddressFormComponent,
          },
          {
            path:"contact-medium-info",
            component: ContactMediumInfoComponent
          },
          {
            path:"contact-medium-info-update",
            component: ContactMediumInfoUpdateFormComponent,
            canDeactivate: [confirmationRouteGuard],
          }
        ]
      },
    ]
  },
  {
    path:"update-account",
    component:UpdateBillingAccountComponent
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
