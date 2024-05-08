import { provideState } from "@ngrx/store";
import { individualCustomerReducer } from "../stores/customers/individual-customer.reducer";
import { addressReducer } from "../stores/addresses/address.reducer";
import { contactMediumReducer } from "../stores/contact-medium/contact-medium.reducer";

export function getAppProviders(){

  return [
    provideState( 'individualCustomer' , individualCustomerReducer),
    provideState( 'address' , addressReducer),
    provideState( 'contactMedium', contactMediumReducer),
  ]
}
