import { CreateAddressRequest } from "../../../features/customers/models/address/requests/create-address-request";

export interface AddressState{
  address: AddressItem[];
}
export interface AddressItem extends CreateAddressRequest{
  id: number;
}
export const initialAddressState: AddressState = {
  address: [],
}
