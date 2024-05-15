import { CreateAddressRequest } from "../../../features/customers/models/address/requests/create-address-request";

export interface AddressState{
  address: CreateAddressRequest[];
}

export const initialAddressState: AddressState = {
  address: [{
    // city: '',
    customerId: '',
    street: '',
    districtId: '',
    flatNumber: null,
    description: '',
    isDefaultAddress: false,
  }],
}
