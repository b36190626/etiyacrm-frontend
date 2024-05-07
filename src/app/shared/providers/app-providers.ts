import { provideState } from "@ngrx/store";
import { individualCustomerReducer } from "../stores/customers/individual-customer.reducer";
import { addressReducer } from "../stores/addresses/address.reducer";

export function getAppProviders(){

  return [
    provideState( 'individualCustomer' , individualCustomerReducer),
    provideState( 'address' , addressReducer),
  ]
}
