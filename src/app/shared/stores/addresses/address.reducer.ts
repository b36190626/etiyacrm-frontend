import { createReducer, on } from "@ngrx/store";
import { initialAddressState } from "./address.state";
import { setAddress } from "./address.action";

export const addressReducer = createReducer(
  initialAddressState,
  on(setAddress, (state, {address}) => ({
    ...state,
    address: {
      ...address,
    },
  }))
);
