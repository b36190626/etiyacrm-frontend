import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AddressState } from "./address.state";

const selectAddressState = createFeatureSelector<AddressState>('Addresses');


export const selectAllAddresses = createSelector(
  selectAddressState,
  (state: AddressState) => state.addresses
);
