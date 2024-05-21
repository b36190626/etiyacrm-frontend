import { setAddress, setAddresses } from './address.action';
import { initialAddressState } from './address.state';
import { createReducer, on } from "@ngrx/store";


export const addressReducer = createReducer(
  initialAddressState,
  on(setAddress, (state, { address }) => ({
    ...state,
    address: [
      ...state.address.filter(a => a.id !== address.id), // Eski adresi kaldır
      address // Yeni adresi ekle
    ]
  })),
  on(setAddresses, (state, { addresses }) => ({
    ...state,
    address: addresses
  }))
);
