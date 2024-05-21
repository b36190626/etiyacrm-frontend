import { createAction, props } from "@ngrx/store";
import { AddressItem } from "./address.state";

export const setAddress = createAction(
  '[address] set address',
  props<{ address: AddressItem}>())

  export const setAddresses = createAction(
    '[address] set addresses',
    props<{ addresses: AddressItem[] }>()
  );
