import { createReducer, on } from "@ngrx/store";
import { initialIndividualCustomerState } from "./individual-customer.state";
import { setIndividualCustomer } from "./individual-customer.action";

export const individualCustomerReducer = createReducer(
  initialIndividualCustomerState,
  on(setIndividualCustomer, (state, { individualCustomer }) => ({
    ...state,
    individualCustomer: {
      ...individualCustomer,
    },
  }))
);
