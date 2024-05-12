import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AddressState } from "./address.state";

const selectAddressState = createFeatureSelector<AddressState>('address');

export const selectAddress = createSelector(
  selectAddressState,
  (state: AddressState) => state.address
);
