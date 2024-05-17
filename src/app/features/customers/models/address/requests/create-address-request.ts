export interface CreateAddressRequest{
  street: string;
  districtId: string;
  customerId: string;
  flatNumber: number;
  description: string;
  defaultAddress: boolean;
}
