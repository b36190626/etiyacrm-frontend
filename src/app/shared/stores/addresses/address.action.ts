import { createAction, props } from "@ngrx/store";
import { CreateAddressRequest } from "../../../features/customers/models/address/requests/create-address-request";

export const setAddress = createAction(
  '[Address] set Address',
  props<{ address: CreateAddressRequest }>()
);
