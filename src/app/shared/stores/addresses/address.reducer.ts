import { setAddress } from './address.action';
import { initialAddressState } from './address.state';
import { createReducer, on } from "@ngrx/store";


export const addressReducer = createReducer(
  initialAddressState,
  on(setAddress, (state, {address}) => ({
    ...state,
    address: {
      ...address,
    }
  }))
);
