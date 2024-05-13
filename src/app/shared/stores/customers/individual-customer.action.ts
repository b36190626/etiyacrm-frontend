import { createAction, props } from "@ngrx/store";
import { CreateCustomerRequest } from "../../../features/customers/models/customer/requests/create-customer-request";

export const setIndividualCustomer = createAction(
  '[Individual Customer] set Individual Customer',
  props<{ individualCustomer: CreateCustomerRequest }>()
);
export const finalizeCustomer = createAction(
  '[Customer] Finalize Customer',
  props<{ individualCustomer: CreateCustomerRequest, contactMedium: any, address: any }>()
);

export const saveContactMediumSuccess = createAction(
  '[API] Save Contact Medium Success',
  props<{ payload: any }>()
);

export const saveAddressSuccess = createAction(
  '[API] Save Address Success',
  props<{ payload: any }>()
);

export const saveFailed = createAction(
  '[API] Save Failed',
  props<{ error: any }>()
);
