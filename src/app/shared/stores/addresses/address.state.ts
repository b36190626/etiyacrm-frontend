import { CreateAddressRequest } from "../../../features/customers/models/address/requests/create-address-request";

export interface AddressState{
  addresses: CreateAddressRequest;
}

export const initialAddressState: AddressState = {
  addresses: {
    city: '',
    street: '',
    district: '',
    flatNumber: null,
    description: '',
  },
}
