export interface UpdateAddressRequest {
  id: string;
  description: string;
  street: string
  flatNumber: number;
  isDefaultAddress: boolean;
  districtId: string;
  customerId: string;
}
